const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the workspace libraries
config.watchFolders = [workspaceRoot];

// Resolve modules from the workspace root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Handle workspace protocol imports
config.resolver.extraNodeModules = {
  '@pb/data': path.resolve(workspaceRoot, 'libs/data/src'),
  '@pb/state': path.resolve(workspaceRoot, 'libs/state/src'),
  '@pb/shared': path.resolve(workspaceRoot, 'libs/shared/src'),
};

module.exports = config;
