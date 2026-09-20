import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Proposal from '@/lib/models/Proposal';
import { sendMail, INTERNAL_NOTIFICATION_EMAIL } from '@/lib/mailer';
import {
  getProposalInternalTemplate,
  getProposalConfirmationTemplate,
} from '@/lib/templates/emailTemplates';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. If an external non-localhost backend URL is explicitly configured, try proxying first
    const externalBackendUrl = process.env.BACKEND_API_URL;
    if (externalBackendUrl && !externalBackendUrl.includes('localhost')) {
      try {
        const response = await fetch(`${externalBackendUrl}/api/partners/propose`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      } catch (proxyError) {
        console.warn('[API Propose Proxy Fallback] External backend unreachable, switching to native Next.js handler:', proxyError);
      }
    }

    // 2. Native Direct Next.js Execution
    const fullName = (body.fullName || body.contactName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const companyName = (body.companyName || body.organization || '').trim();
    const proposalDetails = (body.proposalDetails || body.proposal || '').trim();

    // Validation
    const missingFields: string[] = [];
    if (!fullName) missingFields.push('Full Name (fullName)');
    if (!email) missingFields.push('Email Address (email)');
    if (!companyName) missingFields.push('Company / Organization Name (companyName)');
    if (!proposalDetails) missingFields.push('Proposal Details (proposalDetails)');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required field(s): ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format. Please provide a valid email.' },
        { status: 400 }
      );
    }

    // Honeypot check for bots
    if (body._hp_check) {
      return NextResponse.json({
        success: true,
        message: 'Proposal received successfully',
        reference: 'BX-PRP-SPAM-PROTECTED',
      });
    }

    // Persist to MongoDB Atlas
    let savedProposal: any = null;
    let referenceCode = `BX-PRP-${new Date().getFullYear()}-${Math.random().toString(36).slice(-6).toUpperCase()}`;

    try {
      await connectDB();
      savedProposal = await Proposal.create({
        fullName,
        email,
        companyName,
        proposalDetails,
        status: 'received',
        phone: body.phone ? String(body.phone).trim() : undefined,
        country: body.country ? String(body.country).trim() : undefined,
        website: body.website ? String(body.website).trim() : undefined,
        partnershipType: body.type || body.partnershipType || undefined,
        proposalTitle: body.proposalTitle ? String(body.proposalTitle).trim() : undefined,
        targetProductId: body.targetProductId || undefined,
        timeline: body.timeline || undefined,
      });

      if (savedProposal) {
        referenceCode = savedProposal.referenceCode;
      }
    } catch (dbError) {
      console.error('[API Propose DB Error] Failed to persist proposal to MongoDB:', dbError);
    }

    // Dispatch emails via Hostinger SMTP
    const internalTemplate = getProposalInternalTemplate({
      fullName,
      email,
      companyName,
      proposalDetails,
      phone: body.phone,
      website: body.website,
      country: body.country,
      partnershipType: body.type || body.partnershipType,
      proposalTitle: body.proposalTitle,
      targetProductId: body.targetProductId,
      timeline: body.timeline,
      referenceCode,
      _id: savedProposal?._id?.toString(),
    });

    const userTemplate = getProposalConfirmationTemplate({
      fullName,
      email,
      companyName,
      referenceCode,
      _id: savedProposal?._id?.toString(),
    });

    // Send emails asynchronously (don't block the response)
    Promise.allSettled([
      sendMail({
        to: INTERNAL_NOTIFICATION_EMAIL,
        subject: internalTemplate.subject,
        text: internalTemplate.text,
        html: internalTemplate.html,
        replyTo: email,
      }),
      sendMail({
        to: email,
        subject: userTemplate.subject,
        text: userTemplate.text,
        html: userTemplate.html,
      }),
    ]).catch((err) => {
      console.error('[API Propose Mailer Error] Background email dispatch failed:', err);
    });

    return NextResponse.json({
      success: true,
      message:
        'Your partnership proposal has been submitted successfully. A confirmation email has been dispatched, and our team will review your proposal shortly.',
      proposalId: savedProposal?._id || referenceCode,
      reference: referenceCode,
      queued: true,
      createdAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('[API Propose Fatal Error]:', error);
    return NextResponse.json(
      { success: false, error: `Failed to process proposal: ${errorMessage}` },
      { status: 500 }
    );
  }
}
