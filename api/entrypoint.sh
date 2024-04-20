#!/bin/sh

echo "Running Flask Database Upgrade..."
flask db upgrade
if [ $? -ne 0 ]; then
  echo "Failed to upgrade database."
  exit 1
fi

echo "Starting Flask Application..."
exec flask run --port=8080
