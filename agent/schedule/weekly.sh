#!/usr/bin/env bash
# The weekly run, as one command. Point cron at it, or run it by hand on Fridays.
#
#   agent/schedule/weekly.sh [path-to-mail]
#
# Mail comes from wherever you put it: a directory of .eml, an mbox export, or the
# JSON dump an MCP-connected assistant writes (see agent/README.md § Getting the
# email in). Default is whatever is newest in agent/state/inbox/.
#
# Every step is fail-closed: if the audit finds a figure that is not in its email,
# the digest is not published and the run exits non-zero. A digest you cannot trust
# is worse than no digest, because you will act on it anyway.

set -euo pipefail
cd "$(dirname "$0")/../.."

INBOX="${1:-$(ls -t agent/state/inbox/*.json 2>/dev/null | head -1 || true)}"
SEED="$(date +%F)"
BRIDGE="agent/state/bridge/$SEED"

if [ -z "$INBOX" ] || [ ! -e "$INBOX" ]; then
  echo "no mail found. Put a dump in agent/state/inbox/, or pass a path:"
  echo "  agent/schedule/weekly.sh ~/mail/ventures"
  exit 1
fi

echo "== mail:  $INBOX"
echo "== seed:  $SEED"

RECORDS="$BRIDGE/records.json"
ARGS=(--in "$INBOX" --seed "$SEED")

if [ -f "$RECORDS" ]; then
  # An assistant already did the extraction pass for this date.
  echo "== using supplied records: $RECORDS"
  ARGS+=(--records "$RECORDS")
  [ -f "$BRIDGE/scores.json" ]   && ARGS+=(--scores "$BRIDGE/scores.json")
  [ -f "$BRIDGE/ventures.json" ] && ARGS+=(--ventures-in "$BRIDGE/ventures.json")

  echo "== auditing every figure against its email"
  node agent/eval/eval.mjs --in "$INBOX" --records "$RECORDS"
fi

node agent/run.mjs "${ARGS[@]}"

DIGEST="agent/out/digest-$SEED.md"
echo
echo "== digest: $DIGEST"
command -v open >/dev/null && open "$DIGEST" || true
