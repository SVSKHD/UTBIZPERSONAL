import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests
export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'Hello, TypeScript World!' },
    { status: 200 }
  );
}