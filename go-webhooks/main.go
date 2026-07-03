// FastAPI-equivalent in Go: verified Furlpay webhooks with the stdlib only.
//
//	FURLPAY_ENDPOINT_SECRET=whsec_... go run .
package main

import (
	"io"
	"log"
	"net/http"
	"os"

	furlpay "github.com/furlpay/furlpay-go"
)

func main() {
	secret := os.Getenv("FURLPAY_ENDPOINT_SECRET")

	http.HandleFunc("/webhooks", func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "read error", http.StatusBadRequest)
			return
		}

		event, err := furlpay.ConstructEvent(body, r.Header.Get("furlpay-signature"), secret)
		if err != nil {
			log.Printf("signature verification failed: %v", err)
			http.Error(w, "invalid signature", http.StatusBadRequest)
			return
		}

		switch event.Type {
		case "payment.settled":
			log.Printf("payment settled: %s", string(event.Data))
			// fulfil the order
		default:
			log.Printf("unhandled event: %s", event.Type)
		}
		w.WriteHeader(http.StatusOK)
	})

	log.Println("listening on :4242")
	log.Fatal(http.ListenAndServe(":4242", nil))
}
