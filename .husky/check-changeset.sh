# Check if any staged file is in the .changeset folder.
if ! git diff --cached --name-only | grep -q "^.changeset/"; then
  echo "🚨 No changeset file found in the staged changes."
  echo "If you're modifying a package that needs a release, please run 'pnpm changeset' to create one and add it to your commit."
  exit 1
fi
