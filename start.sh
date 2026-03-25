#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "============================================"
echo "  LiveTile Design - Development Server"
echo "============================================"
echo ""

# Check for node_modules
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting Vite dev server..."
echo "Press Ctrl+C to stop."
echo ""
exec npm run dev
