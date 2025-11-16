#!/usr/bin/env bash

# Setup script for TOON git merge driver
# This configures git to automatically resolve TOON file conflicts

set -e

echo "🔧 Setting up TOON merge driver..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ Error: Not in a git repository"
  exit 1
fi

# Get git root
GIT_ROOT=$(git rev-parse --show-toplevel)
cd "$GIT_ROOT"

# Check if merge driver script exists
if [ ! -f "tools/toon/merge-driver.js" ]; then
  echo "❌ Error: tools/toon/merge-driver.js not found"
  exit 1
fi

# Make merge driver executable
chmod +x tools/toon/merge-driver.js

# Configure git merge driver
git config merge.toon.driver "node tools/toon/merge-driver.js %O %A %B %L %P"
git config merge.toon.name "TOON file auto-resolver"

echo "✅ TOON merge driver configured successfully!"
echo ""
echo "📝 What this does:"
echo "   - Git will automatically resolve TOON file conflicts"
echo "   - The driver accepts current branch version"
echo "   - You still need to run 'npm run toon:generate' after merge"
echo ""
echo "🎯 Next time you encounter TOON conflicts:"
echo "   1. Git will auto-resolve them"
echo "   2. Complete the merge: git merge --continue"
echo "   3. Regenerate TOON: npm run toon:generate"
echo "   4. Commit: git commit -m 'chore: update TOON cache [skip ci]'"
echo ""
echo "✅ Setup complete!"
