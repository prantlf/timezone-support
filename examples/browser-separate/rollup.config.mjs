import { babel } from '@rollup/plugin-babel'
import { minify } from 'rollup-plugin-swc-minify'

export default [
  {
    input: 'src/app.js',
    external: [
      'timezone-support'
    ],
    output: {
      file: 'out/app.js',
      format: 'iife',
      globals: {
        'timezone-support': 'timezoneSupport'
      },
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
      minify()
    ]
  }
]
