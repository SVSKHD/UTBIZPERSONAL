import { NextRequest, NextResponse } from "next/server";
import { KiteConnect } from "kiteconnect";

interface Symbol {
  tradingSymbol: string;
  exchange: string;
  instrumentType: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { access_token, type, exchange } = await req.json();

    if (!access_token) {
      return NextResponse.json(
        { error: "Access token is required" },
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

    // Fetch instruments
    const instruments = await kite.getInstruments();

    // Filter instruments based on type and exchange if provided
    const filteredInstruments = instruments.filter((inst) => {
        const matchesType = !type || inst.instrument_type === type; // Match if no type filter or matches type
        const matchesExchange = !exchange || inst.exchange === exchange; // Match if no exchange filter or matches exchange
        return matchesType && matchesExchange; // Both conditions must be true
    });

    // Map the required data
    const symbols: Symbol[] = filteredInstruments.map((inst) => ({
      tradingSymbol: inst.tradingsymbol,
      exchange: inst.exchange,
      instrumentType: inst.instrument_type,
    }));

    // Return the symbols as JSON response
    return NextResponse.json({symbols,length:symbols.length});
  } catch (error) {
    console.error("Error fetching symbols:", error);
    return NextResponse.json(
      { error: "Failed to fetch symbols." },
      { status: 500 }
    );
  }
}