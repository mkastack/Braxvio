import nodemailer, { type Transporter } from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true;
const SMTP_USER = process.env.SMTP_USER || 'admin@braxvio.com';
const SMTP_PASS = process.env.SMTP_PASS;
const DEFAULT_FROM = process.env.EMAIL_FROM || '"Braxvio Global" <admin@braxvio.com>';
export const INTERNAL_NOTIFICATION_EMAIL = process.env.INTERNAL_NOTIFICATION_EMAIL || 'admin@braxvio.com';

const CAREERS_SMTP_USER = process.env.CAREERS_SMTP_USER || 'jobs@braxvio.com';
const CAREERS_SMTP_PASS = process.env.CAREERS_SMTP_PASS || 'glry-3gym-y6u2-wqj5';
export const CAREERS_EMAIL_FROM = process.env.CAREERS_EMAIL_FROM || '"Braxvio Talent Team" <jobs@braxvio.com>';
export const CAREERS_NOTIFICATION_EMAIL = process.env.CAREERS_NOTIFICATION_EMAIL || 'jobs@braxvio.com';

let transporter: Transporter | null = null;
let talentTransporter: Transporter | null = null;

export function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });
  }
  return transporter;
}

export function getTalentTransporter(): Transporter {
  if (!talentTransporter) {
    talentTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: CAREERS_SMTP_USER,
        pass: CAREERS_SMTP_PASS,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });
  }
  return talentTransporter;
}

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendMail(options: SendMailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const t = getTransporter();
    const info = await t.sendMail({
      from: options.from || DEFAULT_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
    });

    console.log(`[Mailer] Dispatched email to ${options.to}: Message ID ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown mailer error';
    console.error(`[Mailer Error] Failed to send email to ${options.to}:`, errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function sendTalentMail(options: SendMailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const t = getTalentTransporter();
    const info = await t.sendMail({
      from: options.from || CAREERS_EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
    });

    console.log(`[Talent Mailer] Dispatched email to ${options.to}: Message ID ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown talent mailer error';
    console.error(`[Talent Mailer Error] Failed to send email via talent transporter to ${options.to}:`, errorMessage);
    console.warn('[Talent Mailer] Falling back to default mailer...');
    return sendMail({
      ...options,
      from: options.from || CAREERS_EMAIL_FROM,
    });
  }
}
