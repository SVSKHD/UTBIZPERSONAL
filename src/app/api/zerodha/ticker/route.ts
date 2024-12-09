// import { NextRequest, NextResponse } from "next/server";
// import { KiteTicker } from "kiteconnect";

// interface TickerRequestBody {
//   access_token: string;
//   tokens?: number[];
// }

// let tickerInstance: KiteTicker | null = null;
// let latestTicks: any[] = []; // Store the latest ticks

// export async function POST(req: NextRequest) {
//   try {
//     const { access_token, tokens }: TickerRequestBody = await req.json();
//     const apiKey = process.env.KITE_API_KEY;

//     // Validate input
//     if (!apiKey || !access_token) {
//       return NextResponse.json(
//         { error: "api_key and access_token are required" },
//         { status: 400 }
//       );
//     }

//     // Disconnect existing ticker instance if any
//     if (tickerInstance) {
//       tickerInstance.disconnect();
//       tickerInstance = null;
//       latestTicks = []; // Clear ticks on disconnect
//     }

//     // Initialize KiteTicker instance
//     tickerInstance = new KiteTicker({
//       api_key: apiKey,
//       access_token,
//     });

//     // Set auto-reconnect
//     tickerInstance.autoReconnect(true, 10, 5);

//     // Connect the ticker
//     tickerInstance.connect();

//     // Event listeners
//     tickerInstance.on("ticks", (ticks: any[]) => {
//       console.log("Ticks received:", ticks);
//       latestTicks = ticks; // Store the latest ticks
//     });

//     tickerInstance.on("connect", () => {
//       const tokenItems = tokens || [738561]; // Default token if not provided
//       console.log("Subscribing to tokens:", tokenItems);
//       tickerInstance?.subscribe(tokenItems);
//       tickerInstance?.setMode(tickerInstance.modeFull, tokenItems);
//     });

//     tickerInstance.on("noreconnect", () => {
//       console.log("No reconnect attempts left.");
//     });

//     tickerInstance.on("reconnect", (reconnectCount: number, reconnectInterval: number) => {
//       console.log(
//         `Reconnecting: attempt - ${reconnectCount}, interval - ${reconnectInterval} seconds`
//       );
//     });

//     return NextResponse.json(
//       { message: "Ticker started successfully", tokens: tokens || [738561] },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error initializing ticker:", error);
//     return NextResponse.json(
//       { error: "Failed to start ticker", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     // Return the latest ticks
//     if (latestTicks.length === 0) {
//       return NextResponse.json(
//         { message: "No ticks received yet. The ticker might still be initializing." },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Latest ticks received", ticks: latestTicks },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error fetching ticks:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch ticks", details: error.message },
//       { status: 500 }
//     );
//   }
// }