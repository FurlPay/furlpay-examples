# Express — verified webhooks + payments

Handle Furlpay webhooks safely (raw-body HMAC verification, replay protection) and make a gas-sponsored USDC transfer.

```sh
npm install
FURLPAY_API_KEY=sk_sandbox_... FURLPAY_ENDPOINT_SECRET=whsec_... npm start
```

Test locally with the CLI:

```sh
npx @furlpay/cli listen --forward-to localhost:4242/webhooks
npx @furlpay/cli trigger payment.settled
```

**The one thing people get wrong:** the webhook route must receive the *raw* request body. Register it with `express.raw()` before any `express.json()` middleware, or signature verification will fail.
