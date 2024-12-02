import { NextRequest, NextResponse } from "next/server";
import { KiteConnect } from "kiteconnect";

const apiKey = process.env.KITE_API_KEY;

export const GET = async (req: NextRequest) => {
  try {
    const kc = new KiteConnect({ api_key: apiKey });
    const loginUrl = kc.getLoginURL();
    return NextResponse.json({ loginUrl });
  } catch (error) {
    console.error("Error generating login URL:", error);
    return NextResponse.json({ error: "Failed to generate login URL" }, { status: 500 });
  }
};
