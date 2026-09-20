import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import TalentApplication from '@/lib/models/TalentApplication';
import { sendMail, INTERNAL_NOTIFICATION_EMAIL } from '@/lib/mailer';
import {
  getTalentInternalTemplate,
  getTalentConfirmationTemplate,
} from '@/lib/templates/emailTemplates';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Proxy support if external URL is provided
    const externalBackendUrl = process.env.BACKEND_API_URL;
    if (externalBackendUrl && !externalBackendUrl.includes('localhost')) {
      try {
        const response = await fetch(`${externalBackendUrl}/api/careers/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      } catch (proxyError) {
        console.warn('[API Careers Proxy Fallback] External backend unreachable, switching to native Next.js handler:', proxyError);
      }
    }

    // Native execution
    const name = (body.name || body.fullName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const message = (body.message || body.coverLetter || '').trim();
    const discipline = (body.discipline || body.role || 'Engineering').trim();
    const location = (body.location || '').trim();
    const portfolio = (body.portfolio || '').trim();
    const linkedin = (body.linkedin || '').trim();
    const github = (body.github || '').trim();

    const missingFields: string[] = [];
    if (!name) missingFields.push('Full Name');
    if (!email) missingFields.push('Email Address');
    if (!message) missingFields.push('Cover Letter / Introduction');

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
        message: 'Application received successfully',
        reference: 'BX-TLT-SPAM-PROTECTED',
      });
    }

    let savedApp: any = null;
    let referenceCode = `BX-TLT-${new Date().getFullYear()}-${Math.random().toString(36).slice(-6).toUpperCase()}`;

    try {
      await connectDB();
      savedApp = await TalentApplication.create({
        name,
        email,
        message,
        discipline,
        location,
        portfolio,
        linkedin,
        github,
        status: 'received',
      });

      if (savedApp) {
        referenceCode = savedApp.referenceCode;
      }
    } catch (dbError) {
      console.error('[API Careers DB Error] Failed to persist talent application:', dbError);
    }

    // Dispatch emails via Hostinger SMTP
    const internalTemplate = getTalentInternalTemplate({
      name,
      email,
      discipline,
      location,
      portfolio,
      linkedin,
      github,
      message,
      referenceCode,
      _id: savedApp?._id?.toString(),
    });

    const userTemplate = getTalentConfirmationTemplate({
      name,
      email,
      referenceCode,
      _id: savedApp?._id?.toString(),
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
      console.error('[API Careers Mailer Error] Email dispatch failed:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Your application has been received successfully. A confirmation email has been dispatched.',
      reference: referenceCode,
      queued: true,
      createdAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('[API Careers Fatal Error]:', error);
    return NextResponse.json(
      { success: false, error: `Failed to process application: ${errorMessage}` },
      { status: 500 }
    );
  }
}
