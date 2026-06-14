#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(dirname "$SCRIPT_DIR")"
NODE_BIN="$(which node)"
LOG_FILE="$BACKEND_DIR/logs/update-schema.log"
CRON_JOB="0 0 * * * TZ=Europe/Kyiv cd $BACKEND_DIR && $NODE_BIN scripts/updateSchema.js >> $LOG_FILE 2>&1"

if crontab -l 2>/dev/null | grep -qF "updateSchema.js"; then
  echo "[cron-setup] cron job already exists, skipping"
  crontab -l | grep "updateSchema.js"
  exit 0
fi

(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "[cron-setup] cron job added:"
echo "$CRON_JOB"
