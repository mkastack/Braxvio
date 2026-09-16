import { NextRequest, NextResponse } from 'next/server';
import { addInternalNote } from '@/lib/partnerships-storage';

interface Context {
  params: Promise<{ type: string; id: string }>;
}

export async function POST(req: NextRequest, { params }: Context) {
  try {
    const { type, id } = await params;
    const body = await req.json();
    const { content, authorName, authorRole } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Note content is required' }, { status: 400 });
    }

    if (type !== 'partnership' && type !== 'investment' && type !== 'project') {
      return NextResponse.json({ error: 'Invalid inquiry type' }, { status: 400 });
    }

    const updated = await addInternalNote(type, id, {
      content: content.trim(),
      authorName: authorName || 'Authorized Staff',
      authorRole: authorRole || 'Team Member',
    });

    if (!updated) {
      return NextResponse.json({ error: 'Failed to add note. Item not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error('Error adding internal note:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
