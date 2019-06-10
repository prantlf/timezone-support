import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/app.js',
    external: [
      'timezone-support'
    ],
    output: {
      file: 'out/app.js',
      format: 'cjs',
      globals: {
        'timezone-support': 'timezoneSupport'
      },
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  }
]
