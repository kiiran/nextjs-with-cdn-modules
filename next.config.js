const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const moduleToCDN = require('module-to-cdn')
const packageJson = require('./package.json')

const env = process.env.NODE_ENV

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    config.plugins.push(new DynamicCdnWebpackPlugin({ env }))
    
    return config
  },
  serverRuntimeConfig: {
    cdnDependencies: Object.entries(packageJson.dependencies)
      .map(([dep, ver]) => {
        const version = ver.replace(/^(\^|@|~)/, '')
        return moduleToCDN(dep, version, { env })
      })
      .filter(Boolean),
  },
}
