// import { NextRequest, NextResponse } from "next/server";
// import { KiteTicker } from "kiteconnect";

// interface StartTickerRequest {
//   access_token: string;
//   tokens?: number[];
// }

// let tickerInstance: KiteTicker | null = null;

// export async function POST(req: NextRequest) {
//   try {
//     const { access_token, tokens }: StartTickerRequest = await req.json();
//     const apiKey = process.env.KITE_API_KEY;

//     if (!apiKey || !access_token) {
//       return NextResponse.json(
//         { error: "api_key and access_token are required" },
//         { status: 400 }
//       );
//     }

//     if (tickerInstance) {
//       tickerInstance.disconnect();
//       tickerInstance = null;
//     }

//     tickerInstance = new KiteTicker({
//       api_key: apiKey,
//       access_token,
//     });

//     tickerInstance.autoReconnect(true, 10, 5);

//     tickerInstance.connect();

//     tickerInstance.on("connect", () => {
//       const tokenItems = tokens || [738561];
//       console.log("Subscribing to tokens:", tokenItems);
//       tickerInstance?.subscribe(tokenItems);
//       tickerInstance?.setMode(tickerInstance.modeFull, tokenItems);
//     });

//     tickerInstance.on("ticks", (ticks: any[]) => {
//       console.log("Ticks received:", ticks);
//     });

//     return NextResponse.json({ message: "Ticker started successfully" }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Failed to start ticker", details: error.message },
//       { status: 500 }
//     );
//   }
// }