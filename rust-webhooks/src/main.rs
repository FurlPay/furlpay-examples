//! Verify Furlpay webhook signatures in Rust — zero dependencies.
//!
//! The `furlpay` crate implements HMAC-SHA256 in pure Rust, so this works
//! anywhere (no OpenSSL). Plug `construct_event` into any HTTP framework;
//! this example demonstrates the verification flow standalone.

use furlpay::{construct_event, sign_payload};

fn main() {
    let secret = std::env::var("FURLPAY_ENDPOINT_SECRET").unwrap_or_else(|_| "whsec_demo".into());

    // Simulate an incoming webhook (in production the body + header come
    // from your HTTP framework — axum, actix, rocket, warp...).
    let body = r#"{"id":"evt_1","type":"payment.settled","created":0,"data":{"amount":25}}"#;
    let header = sign_payload(body, &secret, None);

    match construct_event(body, Some(&header), &secret) {
        Ok(event) => println!("verified event: {}", event),
        Err(e) => eprintln!("verification failed: {}", e),
    }

    // Tampered payloads are rejected:
    let tampered = body.replace("25", "9999");
    assert!(construct_event(&tampered, Some(&header), &secret).is_err());
    println!("tampered payload correctly rejected");
}
