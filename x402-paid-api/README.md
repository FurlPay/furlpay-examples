# x402 — charge AI agents per request

Monetize an API for AI agents using the [x402 protocol](https://www.x402.org) (HTTP 402 + stablecoin payment): the server replies `402 Payment Required` with payment details, the agent pays in USDC, retries with a payment proof, and gets the response. No API keys, no signups, no subscriptions.

[`furlpay-x402`](https://github.com/FurlPay/furlpay-x402) provides the middleware and a **facilitator client** — the facilitator verifies and settles the payment so your server never touches chain logic. The hosted Furlpay facilitator settles on EVM networks (Base, Arbitrum); point it at your own deployment to use another chain.

## Server (seller)

```sh
npm install
FURLPAY_PAY_TO=<your-solana-address> npm start
```

See [`server.ts`](./server.ts): one middleware line prices your routes, everything else is a normal Express app.

## Client (buyer / agent)

Any x402-capable client works. With the reference fetch wrapper:

```ts
import { wrapFetchWithPayment } from "x402-fetch";

const paidFetch = wrapFetchWithPayment(fetch, walletClient);
const res = await paidFetch("http://localhost:4021/premium/report");
// 402 → pay 0.01 USDC → automatic retry → 200
```

## Why this matters

Agents can't fill signup forms or manage API keys. Per-request stablecoin payments are how autonomous software buys things — and x402 (Linux Foundation, backed by Coinbase, Cloudflare, Google, Stripe, Visa) is the emerging standard for it.
