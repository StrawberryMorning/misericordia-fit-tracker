#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PATH="$DIR/.runtime/node/bin:$PATH"
echo "Iniciando Brass Bell 2.0 em http://localhost:3000 ..."
exec "$DIR/.runtime/node/bin/node" "$DIR/node_modules/next/dist/bin/next" dev --port 3000
