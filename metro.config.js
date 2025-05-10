const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("cjs");

// Disable unstable package exports
config.resolver.unstable_enablePackageExports = false;


module.exports = withNativeWind(config, { input: "./app/globals.css" });
