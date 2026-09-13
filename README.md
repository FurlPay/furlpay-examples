# Furlpay Examples

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white)
![MCP](https://img.shields.io/badge/MCP-000000?style=flat-square&logo=modelcontextprotocol&logoColor=white)
![x402](https://img.shields.io/badge/x402-0052FF?style=flat-square)

Complete, runnable examples for integrating [Furlpay](https://furlpay.com) — stablecoin payments, wallets, cards, and AI-agent payments — in every major stack.

Clone, `cd` into an example, add your API key, run. Time to first payment: minutes.

```sh
git clone https://github.com/furlpay/furlpay-examples
```

## Examples

| Example | Stack | Shows |
| --- | --- | --- |
| [`nextjs-checkout`](./nextjs-checkout) | Next.js 15 (App Router) | Server-side transfer + `@furlpay/elements` checkout UI |
| [`express-webhooks`](./express-webhooks) | Node.js / Express | Verified webhook handling with `@furlpay/furlpay-node` |
| [`python-fastapi`](./python-fastapi) | Python / FastAPI | Payments + webhook verification with the `furlpay` package |
| [`go-webhooks`](./go-webhooks) | Go (stdlib only) | Webhook verification with `furlpay-go` |
| [`rust-webhooks`](./rust-webhooks) | Rust | Dependency-free signature verification with the `furlpay` crate |
| [`ai-agent-mcp`](./ai-agent-mcp) | Claude / Cursor / MCP | Let AI agents drive Furlpay via `furlpay-mcp-server` |
| [`x402-paid-api`](./x402-paid-api) | TypeScript / x402 | Charge AI agents per-request over HTTP 402 stablecoin payments |

## Prerequisites

- A Furlpay API key (`sk_sandbox_...` for test mode)
- A webhook endpoint secret (`whsec_...`) for the webhook examples

Every SDK uses the same webhook signature scheme — `t=<unix>,v1=<hmac-sha256-hex>` in the `furlpay-signature` header, 5-minute replay tolerance — so the examples are interchangeable across languages.

## SDKs used

| Language | Package |
| --- | --- |
| Node.js / TypeScript | [`@furlpay/furlpay-node`](https://www.npmjs.com/package/@furlpay/furlpay-node) |
| Python | [`furlpay-python`](https://github.com/furlpay/furlpay-python) |
| Go | [`github.com/furlpay/furlpay-go`](https://github.com/furlpay/furlpay-go) |
| Rust | [`furlpay-rust`](https://github.com/furlpay/furlpay-rust) |
| React UI | [`@furlpay/elements`](https://www.npmjs.com/package/@furlpay/elements) |
| CLI | [`@furlpay/cli`](https://www.npmjs.com/package/@furlpay/cli) |

## Local webhook testing

Use the CLI to forward events to your local server (any example on port 4242):

```sh
npx @furlpay/cli listen --forward-to localhost:4242/webhooks
npx @furlpay/cli trigger payment.settled
```

## Questions

Open a [Discussion](https://github.com/furlpay/furlpay-examples/discussions) or email hello@furlpay.com. Security reports: hello@furlpay.com — please don't open public issues.

## License

MIT
