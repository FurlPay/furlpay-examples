import { NextResponse } from "next/server";
import { Furlpay } from "@furlpay/furlpay-node";

const furlpay = new Furlpay({ apiKey: process.env.FURLPAY_API_KEY! });

export async function POST(req: Request) {
  const { destination, amount, signature } = await req.json();

  try {
    const result = await furlpay.wallets.transfer({
      destination,
      amount,
      token: "USDC",
      chain: "solana",
      signature,
    });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode ?? 500 }
    );
  }
}
