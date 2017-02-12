/**
 * Typescript webpack block.
 *
 * @see https://github.com/TypeStrong/ts-loader
 */

module.exports = typescript

/**
 * @param {object} [options]
 * @param {RegExp|Function|string}  [options.exclude]   Directories to exclude.
 * @param {RegExp|Function|string}  [options.include]   Directories to include.
 * @return {Function}
 */
function typescript (options) {
  options = options || {}

  const typescriptDefaultConfig = {
    exclude: /\/node_modules\//
  }

  return Object.assign((context) => {
    // Write typescript config into the context
    context.typescript = context.typescript || typescriptDefaultConfig

    if ('exclude' in options) {
      context.typescript.exclude = options.exclude
    }
    if ('include' in options) {
      context.typescript.include = options.include
    }

    // Return empty config snippet (configuration will be created by the post hook)
    return {}
  }, { pre, post })
}

function post (context) {
  const exclude = context.typescript.exclude
  const include = context.typescript.include

  const typescriptOptions = Object.assign({}, context.typescript)
  delete typescriptOptions.exclude
  delete typescriptOptions.include

  const loaderConfig = Object.assign({
    test: context.fileType('application/x-typescript'),
    loaders: [ 'ts-loader?' + JSON.stringify(typescriptOptions) ]
  }, exclude && {
    exclude: Array.isArray(exclude) ? exclude : [ exclude ]
  }, include && {
    include: Array.isArray(include) ? include : [ include ]
  })

  return {
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    module: {
      loaders: [ loaderConfig ]
    }
  }
}

function pre (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
