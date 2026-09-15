const express = require("express");
const { Furlpay } = require("@furlpay/furlpay-node");

const furlpay = new Furlpay({ apiKey: process.env.FURLPAY_API_KEY });
const endpointSecret = process.env.FURLPAY_ENDPOINT_SECRET;

const app = express();

// Webhooks need the raw body — register this route BEFORE express.json().
app.post("/webhooks", express.raw({ type: "application/json" }), (req, res) => {
  let event;
  try {
    event = Furlpay.webhooks.constructEvent(
      req.body,
      req.headers["furlpay-signature"],
      endpointSecret
    );
  } catch (err) {
    // Log the reason for yourself; do NOT return it.
    //
    // Two things are going on here, and the second is the one that bites:
    //
    //   1. Whoever just failed signature verification is, by definition, not
    //      authenticated. Telling them WHICH check failed — missing header,
    //      malformed header, stale timestamp, bad signature — hands an attacker
    //      a probe for tuning the next attempt. A flat 400 tells them nothing.
    //
    //   2. `res.send(string)` sets Content-Type: text/html. Interpolating error
    //      text into it makes this a reflected-XSS sink the moment a message
    //      contains request input — one upstream change away, not a
    //      hypothetical. `res.json()` is not HTML and carries no such risk,
    //      which is why the handler further down already uses it.
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: "invalid_signature" });
  }

  switch (event.type) {
    case "payment.settled":
      console.log("Payment settled:", event.data);
      // fulfil the order here
      break;
    case "card.transaction.created":
      console.log("Card transaction:", event.data);
      break;
    default:
      console.log("Unhandled event type:", event.type);
  }

  res.json({ received: true });
});

app.use(express.json());

// Example API route: gas-sponsored USDC transfer.
app.post("/pay", async (req, res) => {
  try {
    const result = await furlpay.wallets.transfer({
      destination: req.body.destination,
      amount: req.body.amount,
      token: "USDC",
      chain: "solana",
      signature: req.body.signature,
    });
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log("Listening on http://localhost:4242"));
