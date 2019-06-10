import babel from 'rollup-plugin-babel'
import clean from 'rollup-plugin-clean'

export default [
  {
    input: 'src/app.js',
    external: [
      'timezone-support'
    ],
    output: {
      file: 'out/app.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  }
]
