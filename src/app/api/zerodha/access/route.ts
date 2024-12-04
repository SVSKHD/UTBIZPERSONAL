import { NextRequest, NextResponse } from 'next/server';
import { KiteConnect } from 'kiteconnect';

export async function POST(req: NextRequest) {
  try {
    const { requestToken } = await req.json();
    console.log("Request Token:", requestToken);

    const apiKey = process.env.KITE_API_KEY;
    const apiSecret = process.env.KITE_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'API key or secret is not configured.' },
        { status: 500 }
      );
    }

    const kite = new KiteConnect({ api_key: apiKey });

    const session = await kite.generateSession(requestToken, apiSecret);
    const accessToken = session.access_token;

    // Optionally, store the access token securely for future use

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Error generating access token:', error);
    return NextResponse.json(
      { error: 'Failed to generate access token' },
      { status: 500 }
    );
  }
}