# AI agents — drive Furlpay from Claude, Cursor & MCP clients

[`@furlpay/mcp-server`](https://www.npmjs.com/package/@furlpay/mcp-server) exposes Furlpay as Model Context Protocol tools, so AI assistants can check balances, send stablecoin transfers, issue cards, and inspect webhooks — with your approval flow in the loop.

## Claude Desktop / Claude Code

Add to `claude_desktop_config.json` (or `.mcp.json` in a Claude Code project — see [`mcp-config.json`](./mcp-config.json)):

```json
{
  "mcpServers": {
    "furlpay": {
      "command": "npx",
      "args": ["-y", "@furlpay/mcp-server"],
      "env": { "FURLPAY_API_KEY": "sk_sandbox_..." }
    }
  }
}
```

## Cursor

Settings → MCP → Add server, same command: `npx -y @furlpay/mcp-server`.

## Try it

Ask your assistant:

> "What's my Furlpay wallet balance?"
>
> "Send 5 USDC on Solana to `<address>` and show me the transaction hash."
>
> "Create a virtual card capped at $50/month for my OpenAI subscription."

## Safety notes

- Use a **sandbox key** (`sk_sandbox_...`) while experimenting.
- Scope production keys minimally; agents inherit every permission the key has.
- Pair with spend limits (Account Kit escrow / card caps) — never give an agent an unlimited key.
