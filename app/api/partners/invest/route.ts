import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import InvestmentInterest from '@/lib/models/InvestmentInterest';
import { sendMail, INTERNAL_NOTIFICATION_EMAIL } from '@/lib/mailer';
import {
  getInvestmentInternalTemplate,
  getInvestmentConfirmationTemplate,
} from '@/lib/templates/emailTemplates';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Proxy support if external URL is provided
    const externalBackendUrl = process.env.BACKEND_API_URL;
    if (externalBackendUrl && !externalBackendUrl.includes('localhost')) {
      try {
        const response = await fetch(`${externalBackendUrl}/api/partners/invest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      } catch (proxyError) {
        console.warn('[API Invest Proxy Fallback] External backend unreachable, switching to native Next.js handler:', proxyError);
      }
    }

    // Native execution
    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const message = (body.message || body.thesis || '').trim();

    const missingFields: string[] = [];
    if (!firstName) missingFields.push('First Name');
    if (!lastName) missingFields.push('Last Name');
    if (!email) missingFields.push('Email');
    if (!message) missingFields.push('Message / Strategic Thesis');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required field(s): ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // Honeypot check
    if (body._hp_check) {
      return NextResponse.json({
        success: true,
        message: 'Interest registered successfully',
        reference: 'BX-INV-SPAM-PROTECTED',
      });
    }

    let savedInterest: any = null;
    let referenceCode = `BX-INV-${new Date().getFullYear()}-${Math.random().toString(36).slice(-6).toUpperCase()}`;

    try {
      await connectDB();
      savedInterest = await InvestmentInterest.create({
        firstName,
        lastName,
        email,
        message,
        phone: body.phone ? String(body.phone).trim() : undefined,
        organization: body.organization ? String(body.organization).trim() : undefined,
        jobTitle: body.jobTitle ? String(body.jobTitle).trim() : undefined,
        country: body.country ? String(body.country).trim() : undefined,
        website: body.website ? String(body.website).trim() : undefined,
        investorType: body.investorType || undefined,
        interestType: body.interestType || undefined,
        productId: body.productId || undefined,
        indicativeRange: body.indicativeRange || undefined,
        timeline: body.timeline || undefined,
      });

      if (savedInterest) {
        referenceCode = savedInterest.referenceCode;
      }
    } catch (dbError) {
      console.error('[API Invest DB Error] Failed to persist investment interest:', dbError);
    }

    // Dispatch emails via Hostinger SMTP
    const internalTemplate = getInvestmentInternalTemplate({
      firstName,
      lastName,
      email,
      message,
      organization: body.organization,
      jobTitle: body.jobTitle,
      investorType: body.investorType,
      interestType: body.interestType,
      indicativeRange: body.indicativeRange,
      country: body.country,
      referenceCode,
      _id: savedInterest?._id?.toString(),
    });

    const userTemplate = getInvestmentConfirmationTemplate({
      firstName,
      lastName,
      email,
      referenceCode,
      _id: savedInterest?._id?.toString(),
    });

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
      console.error('[API Invest Mailer Error] Email dispatch failed:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Your investment interest has been successfully recorded. A confirmation email has been dispatched.',
      reference: referenceCode,
      queued: true,
      createdAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('[API Invest Fatal Error]:', error);
    return NextResponse.json(
      { success: false, error: `Failed to process investment submission: ${errorMessage}` },
      { status: 500 }
    );
  }
}
