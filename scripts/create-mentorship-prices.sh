#!/usr/bin/env bash
#
# Create the SINGLE shared Stripe product + price used by all seven Match
# Mentorship add-ons ($99 each):
#
#   Letter of Rec Coaching · Program List Guidance · Research Strategy
#   Personal Statement Review · Mock Interview Session · ERAS CV Review
#   USMLE Step Review
#
# All seven map to lookup_key "mentorship-addon" via `priceKey` in the
# TIERS table in functions/index.js. Firestore still records which specific
# service was bought (TIERS[...].field), so bookings and payments reconcile
# — only the Stripe Price is shared.
#
# WHY A SCRIPT: lookup_key cannot be set from the Stripe Dashboard UI. It is
# an API-only field on the Price object, so this has to go through the CLI
# even though the product itself could be clicked together by hand.
#
# PREREQUISITES
#   npm install -g @stripe/cli
#   stripe login                # browser auth; no secret key is typed anywhere
#
# USAGE
#   bash scripts/create-mentorship-prices.sh            # TEST mode (safe, default)
#   bash scripts/create-mentorship-prices.sh --live     # LIVE mode (real catalog)
#
# Run it in test mode first, confirm the output, then re-run with --live.
#
# SAFETY: Stripe rejects a duplicate ACTIVE lookup_key. If a run half-fails,
# archive whatever it created before retrying.

set -euo pipefail

PRODUCT_NAME="Match Mentorship Add-On"
LOOKUP_KEY="mentorship-addon"
AMOUNT_CENTS=9900

LIVE_FLAG=""
MODE="TEST"
if [[ "${1:-}" == "--live" ]]; then
  LIVE_FLAG="--live"
  MODE="LIVE"
fi

if ! command -v stripe >/dev/null 2>&1; then
  echo "ERROR: stripe CLI not found. Install it with:  npm install -g @stripe/cli" >&2
  exit 1
fi

echo "=================================================="
echo " $MODE mode"
echo " product : $PRODUCT_NAME"
echo " price   : \$$((AMOUNT_CENTS / 100)) USD, one-time"
echo " lookup  : $LOOKUP_KEY"
echo "=================================================="

# Refuse to create a second price on a lookup_key that already resolves.
EXISTING=$(stripe prices list $LIVE_FLAG --lookup-keys="$LOOKUP_KEY" 2>/dev/null || true)
if printf '%s' "$EXISTING" | grep -q '"id": *"price_'; then
  echo
  echo "A price with lookup_key '$LOOKUP_KEY' already exists in $MODE mode:"
  printf '%s' "$EXISTING" | grep -o '"id": *"price_[^"]*"' | head -1
  echo "Nothing to do. Archive it first if you intend to replace it."
  exit 0
fi

if [[ "$MODE" == "LIVE" ]]; then
  read -r -p "This writes to your REAL Stripe catalog. Type YES to continue: " ok
  [[ "$ok" == "YES" ]] || { echo "Aborted."; exit 1; }
fi

echo
echo "Creating product..."
PRODUCT_JSON=$(stripe products create $LIVE_FLAG \
  -d "name=$PRODUCT_NAME" \
  -d "description=Any single Match Mentorship service. The specific service is recorded on the order.")
PRODUCT_ID=$(printf '%s' "$PRODUCT_JSON" | grep -o '"id": *"prod_[^"]*"' | head -1 | sed 's/.*"\(prod_[^"]*\)"/\1/')
if [[ -z "$PRODUCT_ID" ]]; then
  echo "ERROR: could not parse product id." >&2
  printf '%s\n' "$PRODUCT_JSON" >&2
  exit 1
fi
echo "  product: $PRODUCT_ID"

echo "Creating price..."
PRICE_JSON=$(stripe prices create $LIVE_FLAG \
  -d "product=$PRODUCT_ID" \
  -d "unit_amount=$AMOUNT_CENTS" \
  -d "currency=usd" \
  -d "lookup_key=$LOOKUP_KEY")
PRICE_ID=$(printf '%s' "$PRICE_JSON" | grep -o '"id": *"price_[^"]*"' | head -1 | sed 's/.*"\(price_[^"]*\)"/\1/')
echo "  price:   $PRICE_ID  lookup_key=$LOOKUP_KEY"

echo
echo "=================================================="
echo " Done."
echo "=================================================="
echo
echo "Confirm it resolves, and check the two pre-existing keys too —"
echo "if either returns an empty list, that checkout button is already broken:"
echo
for KEY in "$LOOKUP_KEY" strategy-session full-access; do
  echo "  stripe prices list $LIVE_FLAG --lookup-keys=$KEY"
done
echo
echo "Then deploy the backend so the new TIERS entries take effect:"
echo "  firebase deploy --only functions"
