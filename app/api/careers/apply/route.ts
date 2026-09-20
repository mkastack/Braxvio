import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js API route that proxies talent applications to the Express backend service.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';

    const response = await fetch(`${backendUrl}/api/careers/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown connection error';
    return NextResponse.json(
      {
        success: false,
        error: `Could not reach backend processing service: ${errorMessage}. Ensure the Express backend is running.`,
      },
      { status: 502 }
    );
  }
}
