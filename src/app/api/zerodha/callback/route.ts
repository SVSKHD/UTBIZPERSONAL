import { NextApiRequest, NextApiResponse } from "next";
import { KiteConnect } from "kiteconnect";

const apiKey = process.env.KITE_API_KEY!;
const apiSecret = process.env.KITE_API_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { requestToken } = req.body;

    if (!requestToken) {
      return res.status(400).json({ error: "Request token is required" });
    }

    const kc = new KiteConnect({ api_key: apiKey });

    try {
      const session = await kc.generateSession(requestToken, apiSecret);
      kc.setAccessToken(session.access_token);

      // Send only the access token
      res.status(200).json({ accessToken: session.access_token });
    } catch (error) {
      console.error("Error generating session:", error);
      res.status(500).json({ error: "Failed to generate session" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}