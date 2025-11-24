// scripts/strip-workspaces.js
import fs from 'fs';
import path from 'path';

// Get relative package path from CLI args
const pkgDir = process.argv[2];

if (!pkgDir) {
  console.error('❌ Please provide a relative path to the package directory');
  process.exit(1);
}

const pkgPath = path.resolve(process.cwd(), pkgDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

if (pkg.dependencies) {
  const removed = [];

  for (const [dep, version] of Object.entries(pkg.dependencies)) {
    if (version === 'workspace:*' || version?.startsWith('workspace:')) {
      delete pkg.dependencies[dep];
      removed.push(dep);
    }
  }

  if (removed.length > 0) {
    console.log(
      `✔ Stripped workspace dependencies from ${pkgDir}: ${removed.join(', ')}`,
    );
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  } else {
    console.log(`ℹ No workspace:* dependencies found in ${pkgDir}`);
  }
}
