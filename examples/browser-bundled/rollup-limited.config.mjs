import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { minify } from 'rollup-plugin-swc-minify'
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
      commonjs(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
      minify()
    ]
  }
]
