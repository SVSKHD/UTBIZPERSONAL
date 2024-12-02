import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'Hello, TypeScript World!' },
    { status: 200 }
  );
}