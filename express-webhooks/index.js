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
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
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
