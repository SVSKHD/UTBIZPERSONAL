import { NextResponse } from "next/server";
import { KiteConnect } from "kiteconnect";

const apiKey = process.env.KITE_API_KEY;

// if (!apiKey) {
//   throw new Error("KITE_API_KEY is not defined");
// }

export const GET = async () => {
  try {
    const kc = new KiteConnect({ api_key: apiKey });
    const loginUrl = kc.getLoginURL();
    return NextResponse.json({ loginUrl });
  } catch (error) {
    console.error("Error generating login URL:", error);
    return NextResponse.json({ error: "Failed to generate login URL" }, { status: 500 });
  }
};
