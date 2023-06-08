#!/usr/bin/env node

/**
 * This small script simply creates an NPM package with no dependencies.  While
 * Angular CLI needs the dependencies to properly build the app, the compiled
 * product is completely self-contained.  This package can be installed
 * alongside the host/shell web app and served statically to allow the host
 * app to dynimcally request and load plugin modules.
 */

const fs = require('fs-extra');
const path = require('path');
const process = require('process');

const post = builderOptions => {
  const packageDesc = require('./package');
  delete packageDesc.private;
  delete packageDesc.scripts;
  delete packageDesc.dependencies;
  delete packageDesc.devDependencies;
  delete packageDesc.main;
  delete packageDesc.files;
  packageDesc.peerDependencies = {
    '@ng-plugins/eg-core-app': packageDesc.version
  };
  packageDesc.main = "remoteEntry.js";
  const distDir = path.resolve(process.cwd(), builderOptions.outputPath, 'package.json');
  fs.writeFileSync(distDir, JSON.stringify(packageDesc, null, 2))
}

module.exports.default = { post }
