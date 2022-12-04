import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { minify } from 'rollup-plugin-swc-minify'

export default [
  {
    input: 'src/app.js',
    output: {
      file: 'out/app.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      commonjs({
        include: [ './index.js', 'node_modules/**' ],
        sourceMap: false
      }),
      nodeResolve(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
      minify()
    ]
  }
]
