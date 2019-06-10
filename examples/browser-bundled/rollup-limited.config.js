import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import includePaths from 'rollup-plugin-includepaths'

export default [
  {
    input: 'src/app.js',
    output: {
      file: 'out/app.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      includePaths({
        include: {
          'timezone-support': 'node_modules/timezone-support/dist/index-1970-2038.js'
        }
      }),
      commonjs({
        namedExports: {
          'node_modules/timezone-support/dist/index-1970-2038.js': [ 'getZonedTime' ]
        }
      }),
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
    // plugins: [
    //   includePaths({
    //     include: {
    //       'timezone-support': 'node_modules/timezone-support/src/index-1970-2038.js'
    //     }
    //   }),
    //   babel(),
    //   uglify()
    // ]
  }
]
