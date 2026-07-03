"use client";

import { FurlpayCheckoutButton } from "@furlpay/elements";

export default function Home() {
  return (
    <main style={{ maxWidth: 480, margin: "80px auto", fontFamily: "system-ui" }}>
      <h1>Demo store</h1>
      <p>Pro plan — $25.00 in USDC, settled on Solana.</p>
      <FurlpayCheckoutButton
        amount={25}
        token="USDC"
        publishableKey={process.env.NEXT_PUBLIC_FURLPAY_PUBLISHABLE_KEY!}
        onSuccess={({ transactionHash }) => console.log("Paid:", transactionHash)}
        onError={(err) => console.error(err)}
      />
    </main>
  );
}
