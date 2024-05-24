#!/bin/sh

echo "Starting Flask Celery..."
exec celery -A app.app.celery worker --loglevel=info
