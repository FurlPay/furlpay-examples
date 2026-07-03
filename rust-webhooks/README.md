# Rust — webhook verification

Dependency-free Furlpay webhook signature verification with the `furlpay` crate (pure-Rust HMAC-SHA256, no OpenSSL).

```sh
cargo run
```

The verification core (`construct_event`) is framework-agnostic — wire it into axum, actix-web, or anything that gives you the raw body and the `furlpay-signature` header.
