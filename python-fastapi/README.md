# FastAPI — payments + verified webhooks

Gas-sponsored USDC transfers and HMAC-verified webhook handling with the `furlpay` Python package (stdlib-only, no extra dependencies).

```sh
pip install -r requirements.txt
FURLPAY_API_KEY=sk_sandbox_... FURLPAY_ENDPOINT_SECRET=whsec_... uvicorn main:app --port 4242
```

Test locally:

```sh
npx @furlpay/cli listen --forward-to localhost:4242/webhooks
npx @furlpay/cli trigger payment.settled
```
