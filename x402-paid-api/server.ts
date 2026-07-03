/**
 * Sell API access to AI agents over x402 (HTTP 402 + USDC on Solana),
 * settled through the Furlpay facilitator (github.com/furlpay/furlpay-x402).
 *
 *   FURLPAY_PAY_TO=<solana-address> npm start
 */
import express from "express";
import { paymentMiddleware } from "x402-express";

const app = express();

app.use(
  paymentMiddleware(
    process.env.FURLPAY_PAY_TO!, // where the USDC lands
    {
      "GET /premium/report": {
        price: "$0.01",
        network: "solana",
        config: { description: "Market intelligence report" },
      },
      "POST /premium/analyze": {
        price: "$0.05",
        network: "solana",
        config: { description: "Run one analysis job" },
      },
    },
    { url: process.env.FACILITATOR_URL ?? "https://x402.furlpay.com" }
  )
);

// Free route — agents can discover pricing without paying.
app.get("/", (_req, res) => {
  res.json({
    endpoints: [
      { path: "/premium/report", price: "$0.01" },
      { path: "/premium/analyze", price: "$0.05" },
    ],
  });
});

// Paid routes — only reached after the facilitator verifies payment.
app.get("/premium/report", (_req, res) => {
  res.json({ report: "…the good stuff…", paidWith: "USDC on Solana" });
});

app.post("/premium/analyze", express.json(), (req, res) => {
  res.json({ input: req.body, result: "analysis complete" });
});

app.listen(4021, () => console.log("x402 seller on http://localhost:4021"));
