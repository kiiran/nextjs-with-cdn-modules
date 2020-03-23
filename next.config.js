const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const moduleToCDN = require('module-to-cdn')
const packageJson = require('./package.json')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    config.plugins.push(new DynamicCdnWebpackPlugin())
    
    return config
  },
  serverRuntimeConfig: {
    cdnDependencies: Object.entries(packageJson.dependencies)
      .map(([package, version]) => {
        return moduleToCDN(package, version, { env: process.env.NODE_ENV })
      })
      .filter(Boolean),
  },
}
