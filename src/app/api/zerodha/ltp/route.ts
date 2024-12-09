import { NextRequest, NextResponse } from "next/server";
import { KiteConnect } from "kiteconnect";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { access_token, symbols } = await req.json();

    if (!access_token) {
      return NextResponse.json(
        { error: "Access token is required" },
        { status: 400 }
      );
    }

    if (!symbols || symbols.length === 0) {
      return NextResponse.json(
        { error: "Symbols array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.KITE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured." },
        { status: 500 }
      );
    }

    const kite = new KiteConnect({ api_key: apiKey });
    kite.setAccessToken(access_token);

    // Prepare the symbol array for LTP fetching (e.g., ["NSE:RELIANCE", "NSE:TCS"])
    const formattedSymbols = symbols.map(
      (symbol) => `${symbol.exchange}:${symbol.tradingSymbol}`
    );

    // Fetch LTP
    const ltpData = await kite.getLTP(formattedSymbols);

    // Map the LTP data to a simpler structure
    const ltpResponse = Object.keys(ltpData).map((key) => ({
      symbol: key, // e.g., "NSE:RELIANCE"
      tradingSymbol: key.split(":")[1], // Extract trading symbol
      exchange: key.split(":")[0], // Extract exchange
      ltp: ltpData[key].last_price, // Last Traded Price
    }));

    // Return the LTP data as JSON response
    return NextResponse.json({ ltp: ltpResponse });
  } catch (error) {
    console.error("Error fetching LTP:", error);
    return NextResponse.json(
      { error: "Failed to fetch LTP." },
      { status: 500 }
    );
  }
}