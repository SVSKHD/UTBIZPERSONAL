// import { NextResponse } from "next/server";

// let latestTicks: any[] = [];

// export async function GET() {
//   try {
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
//     return NextResponse.json(
//       { error: "Failed to fetch ticks", details: error.message },
//       { status: 500 }
//     );
//   }
// }