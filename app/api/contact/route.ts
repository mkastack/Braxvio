import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ContactInquiry from '@/lib/models/ContactInquiry';
import { sendMail, INTERNAL_NOTIFICATION_EMAIL } from '@/lib/mailer';
import {
  getContactInternalTemplate,
  getContactConfirmationTemplate,
} from '@/lib/templates/emailTemplates';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Proxy support if external URL is provided
    const externalBackendUrl = process.env.BACKEND_API_URL;
    if (externalBackendUrl && !externalBackendUrl.includes('localhost')) {
      try {
        const response = await fetch(`${externalBackendUrl}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      } catch (proxyError) {
        console.warn('[API Contact Proxy Fallback] External backend unreachable, switching to native Next.js handler:', proxyError);
      }
    }

    // Native execution
    const name = (body.name || body.fullName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const subject = (body.subject || '').trim();
    const message = (body.message || '').trim();
    const category = (body.category || 'General').trim();
    const organization = (body.organization || '').trim();

    const missingFields: string[] = [];
    if (!name) missingFields.push('Name');
    if (!email) missingFields.push('Email Address');
    if (!subject) missingFields.push('Subject');
    if (!message) missingFields.push('Message');

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
        message: 'Inquiry received successfully',
        reference: 'BX-CNT-SPAM-PROTECTED',
      });
    }

    let savedInquiry: any = null;
    let referenceCode = `BX-CNT-${new Date().getFullYear()}-${Math.random().toString(36).slice(-6).toUpperCase()}`;

    try {
      await connectDB();
      savedInquiry = await ContactInquiry.create({
        name,
        email,
        category: ['Partnerships', 'General', 'Press', 'Product Support'].includes(category)
          ? category
          : 'General',
        organization,
        subject,
        message,
        status: 'received',
      });

      if (savedInquiry) {
        referenceCode = savedInquiry.referenceCode;
      }
    } catch (dbError) {
      console.error('[API Contact DB Error] Failed to persist contact inquiry:', dbError);
    }

    // Dispatch emails via Hostinger SMTP
    const internalTemplate = getContactInternalTemplate({
      name,
      email,
      category,
      organization,
      subject,
      message,
      referenceCode,
      _id: savedInquiry?._id?.toString(),
    });

    const userTemplate = getContactConfirmationTemplate({
      name,
      email,
      subject,
      referenceCode,
      _id: savedInquiry?._id?.toString(),
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
      console.error('[API Contact Mailer Error] Email dispatch failed:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. A confirmation email has been dispatched, and our team will follow up shortly.',
      reference: referenceCode,
      queued: true,
      createdAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('[API Contact Fatal Error]:', error);
    return NextResponse.json(
      { success: false, error: `Failed to process contact inquiry: ${errorMessage}` },
      { status: 500 }
    );
  }
}
