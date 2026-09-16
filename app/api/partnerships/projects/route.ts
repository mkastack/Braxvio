import { NextRequest, NextResponse } from 'next/server';
import { createProjectProposal } from '@/lib/partnerships-storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Bot protection
    if (body._hp_check) {
      return NextResponse.json({ success: true, reference: 'BX-PROJ-2026-99999' });
    }

    const {
      projectName,
      organization,
      contactName,
      email,
      country,
      industry,
      description,
      problem,
      targetUsers,
      stage,
      needs,
      timeline,
      budgetRange,
      documents,
    } = body;

    if (!projectName || !contactName || !email || !description || !problem) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Project Name, Contact Name, Email, Description, Problem).' },
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

    const project = await createProjectProposal({
      projectName: String(projectName).trim(),
      organization: String(organization || 'Independent').trim(),
      contactName: String(contactName).trim(),
      email: String(email).trim().toLowerCase(),
      country: country ? String(country).trim() : 'Unspecified',
      industry: industry ? String(industry).trim() : 'Technology',
      description: String(description).trim(),
      problem: String(problem).trim(),
      targetUsers: targetUsers ? String(targetUsers).trim() : 'Not specified',
      stage: stage || 'Idea',
      needs: Array.isArray(needs) ? needs : [],
      timeline: timeline || 'Exploring',
      budgetRange: budgetRange ? String(budgetRange).trim() : undefined,
      documents: Array.isArray(documents) ? documents : [],
    });

    return NextResponse.json({
      success: true,
      reference: project.reference,
      id: project.id,
      message: 'Project collaboration proposal received.',
    });
  } catch (error) {
    console.error('Error creating project proposal:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your proposal. Please try again.' },
      { status: 500 }
    );
  }
}
