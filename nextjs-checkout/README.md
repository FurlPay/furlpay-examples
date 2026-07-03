# Next.js — checkout + webhooks

Full checkout flow with the App Router: `@furlpay/elements` checkout button on the client, gas-sponsored USDC transfer in a Route Handler, verified webhook fulfilment.

```sh
npm install
FURLPAY_API_KEY=sk_sandbox_... FURLPAY_ENDPOINT_SECRET=whsec_... npm run dev
```

- `app/page.tsx` — client checkout UI
- `app/api/checkout/route.ts` — server-side transfer (API key never touches the browser)
- `app/api/webhooks/route.ts` — signature-verified fulfilment (`await req.text()` for the raw body)
