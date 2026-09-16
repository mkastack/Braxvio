import { NextRequest, NextResponse } from 'next/server';
import {
  getPartnershipInquiryById,
  updatePartnershipInquiry,
  getInvestmentInterestById,
  updateInvestmentInterest,
  getProjectProposalById,
  updateProjectProposal,
} from '@/lib/partnerships-storage';
import { AdminRole } from '@/data/partnerships';

interface Context {
  params: Promise<{ type: string; id: string }>;
}

export async function GET(req: NextRequest, { params }: Context) {
  try {
    const { type, id } = await params;
    const { searchParams } = new URL(req.url);
    const role = (searchParams.get('role') as AdminRole) || 'SUPER_ADMIN';

    let item: unknown = null;

    if (type === 'partnership') {
      item = await getPartnershipInquiryById(id);
    } else if (type === 'investment') {
      try {
        item = await getInvestmentInterestById(id, role);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'ACCESS_DENIED';
        return NextResponse.json({ error: message }, { status: 403 });
      }
    } else if (type === 'project') {
      item = await getProjectProposalById(id);
    } else {
      return NextResponse.json({ error: 'Invalid inquiry type' }, { status: 400 });
    }

    if (!item) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error fetching enquiry detail:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    const { type, id } = await params;
    const body = await req.json();
    const { status, assignedTo, followUpDate, actorName, role } = body;

    let updated: unknown = null;

    if (type === 'partnership') {
      updated = await updatePartnershipInquiry(
        id,
        {
          ...(status ? { status } : {}),
          ...(assignedTo !== undefined ? { assignedTo } : {}),
          ...(followUpDate !== undefined ? { followUpDate } : {}),
        },
        actorName || 'Staff'
      );
    } else if (type === 'investment') {
      try {
        updated = await updateInvestmentInterest(
          id,
          {
            ...(status ? { status } : {}),
            ...(assignedTo !== undefined ? { assignedTo } : {}),
            ...(followUpDate !== undefined ? { followUpDate } : {}),
          },
          role || 'SUPER_ADMIN',
          actorName || 'Staff'
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'ACCESS_DENIED';
        return NextResponse.json({ error: message }, { status: 403 });
      }
    } else if (type === 'project') {
      updated = await updateProjectProposal(
        id,
        {
          ...(status ? { status } : {}),
          ...(assignedTo !== undefined ? { assignedTo } : {}),
          ...(followUpDate !== undefined ? { followUpDate } : {}),
        },
        actorName || 'Staff'
      );
    }

    if (!updated) {
      return NextResponse.json({ error: 'Item not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
