import { NextRequest, NextResponse } from "next/server";
import { KiteConnect } from "kiteconnect";

interface Symbol {
  exchange: string;
  tradingSymbol: string;
}

interface LTPResponse {
  symbol: string;
  tradingSymbol: string;
  exchange: string;
  ltp: number;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate the request body
    const { access_token, symbols }: { access_token: string; symbols: Symbol[] } = await req.json();

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

    // Fetch the Kite API key from environment variables
    const apiKey = process.env.KITE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured." },
        { status: 500 }
      );
    }

    // Initialize KiteConnect and set the access token
    const kite = new KiteConnect({ api_key: apiKey });
    kite.setAccessToken(access_token);

    // Format symbols for Kite API
    const formattedSymbols = symbols.map(
      (symbol) => `${symbol.exchange}:${symbol.tradingSymbol}`
    );

    // Fetch LTP data from Kite API
    const ltpData = await kite.getLTP(formattedSymbols);

    // Transform the LTP data into a simpler structure
    const ltpResponse: LTPResponse[] = Object.keys(ltpData).map((key) => {
      const [exchange, tradingSymbol] = key.split(":");
      return {
        symbol: key,
        tradingSymbol,
        exchange,
        ltp: ltpData[key].last_price,
      };
    });

    // Return the LTP data as a JSON response
    return NextResponse.json({ ltp: ltpResponse });
  } catch (error) {
    console.error("Error fetching LTP:", error);
    return NextResponse.json(
      { error: "Failed to fetch LTP." },
      { status: 500 }
    );
  }
}