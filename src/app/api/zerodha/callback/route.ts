import { NextResponse } from "next/server";
import { KiteConnect } from "kiteconnect";

const apiKey = process.env.KITE_API_KEY;
const apiSecret = process.env.KITE_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("KITE_API_KEY and KITE_API_SECRET must be defined in environment variables");
}

export async function POST(req: Request) {
  const body = await req.json();
  const { requestToken } = body;

  if (!requestToken) {
    return NextResponse.json({ error: "Request token is required" }, { status: 400 });
  }

  const kc = new KiteConnect({ api_key: apiKey! });

  try {
    const session = await kc.generateSession(requestToken, apiSecret!);
    kc.setAccessToken(session.access_token);

    return NextResponse.json({ accessToken: session.access_token }, { status: 200 });
  } catch (error) {
    console.error("Error generating session:", error);
    return NextResponse.json({ error: "Failed to generate session" }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({ allow: ["POST"] }, { status: 200 });
}