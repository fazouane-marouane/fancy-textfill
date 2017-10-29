/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
const { pathOr } = require('ramda')
const { join } = require('path')
const { ProvidePlugin } = require('webpack')

module.exports = (neutrino) => {
  neutrino.options.output = './dist' // eslint-disable-line no-param-reassign
  neutrino.config
    .externals({
      jquery: {
        commonjs: "jquery",
        amd: "jquery",
        root: "jQuery" // indicates global variable
      }
    })
    .entryPoints.delete('index').end()
    .entry('fancy-text-fill')
      .add(neutrino.options.entry)
      .end()
    .entry('fancy-text-fill.jQuery')
      .add('./src/jquery.plugin.ts')
      .end()
    .devtool('source-map')
    .output
      .path(join(__dirname, './dist'))
      .library('fancyTextFill')
      .libraryTarget('umd')
      .publicPath('./')
      .filename('[name].js')
      .end()
    .plugins
      .delete('chunk')
      .delete('named-modules')
      .end()
}
