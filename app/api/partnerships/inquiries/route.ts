import { NextRequest, NextResponse } from 'next/server';
import { createPartnershipInquiry } from '@/lib/partnerships-storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Bot protection: hidden honeypot trap
    if (body._hp_check) {
      return NextResponse.json({ success: true, reference: 'BX-PART-2026-99999' });
    }

    // Required fields
    const {
      type,
      organization,
      contactName,
      email,
      phone,
      country,
      website,
      industry,
      organizationType,
      targetProductId,
      proposalTitle,
      proposal,
      organizationContribution,
      braxvioContribution,
      contributionTypes,
      timeline,
      documents,
    } = body;

    if (!organization || !contactName || !email || !proposalTitle || !proposal) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Organization, Contact Name, Email, Proposal Title, and Proposal).' },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid business email address.' },
        { status: 400 }
      );
    }

    const inquiry = await createPartnershipInquiry({
      type: type || 'Strategic Partnership',
      organization: String(organization).trim(),
      contactName: String(contactName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      country: country ? String(country).trim() : 'Unspecified',
      website: website ? String(website).trim() : undefined,
      industry: industry ? String(industry).trim() : 'Technology',
      organizationType: organizationType ? String(organizationType).trim() : undefined,
      targetProductId: targetProductId || 'braxvio-parent',
      proposalTitle: String(proposalTitle).trim(),
      proposal: String(proposal).trim(),
      organizationContribution: organizationContribution ? String(organizationContribution).trim() : undefined,
      braxvioContribution: braxvioContribution ? String(braxvioContribution).trim() : undefined,
      contributionTypes: Array.isArray(contributionTypes) ? contributionTypes : [],
      timeline: timeline || 'Exploring',
      documents: Array.isArray(documents) ? documents : [],
    });

    return NextResponse.json({
      success: true,
      reference: inquiry.reference,
      id: inquiry.id,
      message: 'Partnership proposal successfully submitted.',
    });
  } catch (error) {
    console.error('Error creating partnership inquiry:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your proposal. Please try again.' },
      { status: 500 }
    );
  }
}
