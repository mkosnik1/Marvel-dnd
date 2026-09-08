#!/usr/bin/env sh
cd "$(dirname "$0")"
echo "Marvel D&D: http://localhost:8000"
python3 -m http.server 8000
