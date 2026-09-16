import { NextRequest, NextResponse } from 'next/server';
import { createInvestmentInterest } from '@/lib/partnerships-storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Bot protection: hidden honeypot trap
    if (body._hp_check) {
      return NextResponse.json({ success: true, reference: 'BXI-2026-99999' });
    }

    const {
      investorType,
      firstName,
      lastName,
      email,
      phone,
      organization,
      jobTitle,
      country,
      website,
      interestType,
      productId,
      indicativeRange,
      timeline,
      message,
      consentAgreed,
      documents,
    } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide First Name, Last Name, Work Email, and an introductory message.' },
        { status: 400 }
      );
    }

    if (!consentAgreed) {
      return NextResponse.json(
        { error: 'You must confirm the expression of interest disclaimer before submitting.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid business email address.' },
        { status: 400 }
      );
    }

    const investment = await createInvestmentInterest({
      investorType: investorType || 'Individual Investor',
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      organization: organization ? String(organization).trim() : undefined,
      jobTitle: jobTitle ? String(jobTitle).trim() : undefined,
      country: country ? String(country).trim() : 'Unspecified',
      website: website ? String(website).trim() : undefined,
      interestType: interestType || 'Braxvio Parent Company',
      productId: productId || undefined,
      indicativeRange: indicativeRange || 'Prefer not to disclose',
      timeline: timeline || 'Exploring',
      message: String(message).trim(),
      consentAgreed: true,
      documents: Array.isArray(documents) ? documents : [],
    });

    return NextResponse.json({
      success: true,
      reference: investment.reference,
      id: investment.id,
      message: 'Investment interest received.',
    });
  } catch (error) {
    console.error('Error creating investment interest:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your interest. Please try again.' },
      { status: 500 }
    );
  }
}
