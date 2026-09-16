import { NextRequest, NextResponse } from 'next/server';
import {
  getPartnershipInquiries,
  getInvestmentInterests,
  getProjectProposals,
  getOverviewStats,
} from '@/lib/partnerships-storage';
import { AdminRole } from '@/data/partnerships';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = (searchParams.get('role') as AdminRole) || 'SUPER_ADMIN';
    const type = searchParams.get('type') || 'all'; // 'partnerships' | 'investments' | 'projects' | 'all'
    const status = searchParams.get('status') || 'ALL';
    const search = searchParams.get('search') || '';

    const stats = await getOverviewStats(role);

    let partnerships: unknown[] = [];
    let investments: unknown[] = [];
    let projects: unknown[] = [];

    if (type === 'all' || type === 'partnerships') {
      partnerships = await getPartnershipInquiries({ status, search });
    }

    if (type === 'all' || type === 'projects') {
      projects = await getProjectProposals({ status, search });
    }

    if (type === 'all' || type === 'investments') {
      try {
        investments = await getInvestmentInterests(role, { status, search });
      } catch {
        investments = [];
      }
    }

    return NextResponse.json({
      success: true,
      stats,
      data: {
        partnerships,
        investments,
        projects,
      },
    });
  } catch (error) {
    console.error('Error in admin partnerships API:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve partnership enquiries.' },
      { status: 500 }
    );
  }
}
