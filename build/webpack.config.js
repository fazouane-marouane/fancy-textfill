const {
  addPlugins, createConfig, defineConstants, entryPoint, env, performance, setOutput, sourceMaps, webpack
} = require('@webpack-blocks/webpack2')

const typescript = require('./typescript-block')
const plugins = require('./webpack.plugins.config')

module.exports = createConfig([
  setOutput('./dist/bundle.js'),
  typescript(),
  addPlugins(plugins.basePlugins),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development'
  }),
  env('development', [
    entryPoint('./src/index.ts'),
    sourceMaps(),
    performance({
      // Increase performance budget thresholds for development mode
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000
    })
  ]),
  env('production', [
    entryPoint('./src/index.ts'),
    addPlugins(plugins.productionPlugins)
  ])
])
