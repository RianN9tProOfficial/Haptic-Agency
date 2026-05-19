#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const ignoredDirs = new Set(['.git', 'node_modules', '.next']);
const mergeMarkerRegex = /^(<<<<<<<|=======|>>>>>>>)( .*)?$/m;
const filesWithMarkers = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, fullPath);

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      walk(fullPath);
      continue;
    }

    if (!entry.isFile()) continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    if (mergeMarkerRegex.test(content)) {
      filesWithMarkers.push(relPath);
    }
  }
}

walk(rootDir);

if (filesWithMarkers.length > 0) {
  console.error('Merge conflict markers were found in these files:');
  filesWithMarkers.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

console.log('No merge conflict markers found.');
