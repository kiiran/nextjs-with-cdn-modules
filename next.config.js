const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const moduleToCdn = require('module-to-cdn')
const packageJson = require('./package.json')

const env = process.env.NODE_ENV

/**
 * In dev, dependencies are loaded "on demand", which means that if you navigate
 * to a page that has different dependencies, the external dependencies might not
 * be there in the HTML.
 * To work around this issue, this loads everything that's listed in the package.json
 */
const cdnDependencies =
  env === 'production'
    ? {}
    : Object.entries(packageJson.dependencies).reduce((acc, [dep, ver]) => {
        const version = ver.replace(/^(\^|@|~)/, '')
        const pkgInfo = moduleToCdn(dep, version, { env })

        if (pkgInfo) acc[dep] = pkgInfo

        return acc
      }, {})

module.exports = {
  serverRuntimeConfig: {
    cdnDependencies,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new DynamicCdnWebpackPlugin({
        env,
        resolver: (...args) => {
          const pkgInfo = moduleToCdn(...args)
          if (pkgInfo) cdnDependencies[pkgInfo.name] = pkgInfo
          return pkgInfo
        },
      }),
    )

    return config
  },
}
