import { NextResponse } from "next/server";
import { KiteTicker } from "kiteconnect";

let tickerInstance: KiteTicker | null = null;

export async function POST() {
  try {
    if (tickerInstance) {
      tickerInstance.disconnect();
      tickerInstance = null;
      return NextResponse.json({ message: "Ticker stopped successfully" }, { status: 200 });
    }

    return NextResponse.json({ error: "No active ticker to stop" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to stop ticker", details: error.message },
      { status: 500 }
    );
  }
}