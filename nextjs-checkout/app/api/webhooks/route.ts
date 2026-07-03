import { NextResponse } from "next/server";
import { Furlpay } from "@furlpay/furlpay-node";

export async function POST(req: Request) {
  // Read the raw body — required for signature verification.
  const body = await req.text();

  let event;
  try {
    event = Furlpay.webhooks.constructEvent(
      body,
      req.headers.get("furlpay-signature") ?? undefined,
      process.env.FURLPAY_ENDPOINT_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "payment.settled") {
    // fulfil the order
  }

  return NextResponse.json({ received: true });
}
