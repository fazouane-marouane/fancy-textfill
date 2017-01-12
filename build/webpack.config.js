const {
  addPlugins,
  createConfig,
  defineConstants,
  entryPoint,
  env,
  performance,
  setOutput,
  sourceMaps,
  webpack
} = require('@webpack-blocks/webpack2')
const path = require('path')

const typescript = require('./typescript-block')
const plugins = require('./webpack.plugins.config')

module.exports = createConfig([
  setOutput({
    filename: "[name].js",
    path: path.resolve('./dist'),
    library: "fancyTextFill",
    libraryTarget: 'umd'
  }),
  function () {
    return {
      externals: {
        "jQuery": "jQuery"
      }
    }
  },
  typescript(),
  addPlugins(plugins.basePlugins),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development'
  }),
  entryPoint({
    "fancy-text-fill": './src/index.ts',
    "fancy-text-fill.jQuery": "./src/jquery.plugin.ts"
  }),
  env('development', [
    sourceMaps(),
    performance({
      // Increase performance budget thresholds for development mode
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000
    })
  ]),
  env('production', [
    addPlugins(plugins.productionPlugins)
  ])
])
