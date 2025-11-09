#!/usr/bin/env bash
set -e
mkdir -p "$(dirname "$0")/certs"
cd "$(dirname "$0")/certs"

# Certificat auto-signé pour dev local (valide 365 jours)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem -out cert.pem \
  -subj "/C=US/ST=CA/L=SF/O=Dev/OU=XR/CN=localhost"

echo "Certificats générés dans dev-server/certs (key.pem, cert.pem)"
