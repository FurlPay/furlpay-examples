"""FastAPI + Furlpay: payments and verified webhooks.

Run:
    FURLPAY_API_KEY=sk_sandbox_... FURLPAY_ENDPOINT_SECRET=whsec_... \
        uvicorn main:app --port 4242
"""
import os

from fastapi import FastAPI, Header, HTTPException, Request
from furlpay import Furlpay, FurlpayError, construct_event, WebhookVerificationError

app = FastAPI()
client = Furlpay(api_key=os.environ["FURLPAY_API_KEY"])
ENDPOINT_SECRET = os.environ["FURLPAY_ENDPOINT_SECRET"]


@app.post("/pay")
async def pay(request: Request):
    body = await request.json()
    try:
        return client.wallets_transfer(
            destination=body["destination"],
            amount=body["amount"],
            token="USDC",
            chain="solana",
            signature=body["signature"],
        )
    except FurlpayError as e:
        raise HTTPException(status_code=e.status_code, detail=str(e))


@app.post("/webhooks")
async def webhooks(request: Request, furlpay_signature: str = Header(None)):
    # Raw body is required for signature verification.
    payload = await request.body()
    try:
        event = construct_event(payload, furlpay_signature, ENDPOINT_SECRET)
    except WebhookVerificationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if event["type"] == "payment.settled":
        pass  # fulfil the order

    return {"received": True}
