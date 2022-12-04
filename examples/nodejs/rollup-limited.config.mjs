import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import includePaths from 'rollup-plugin-includepaths'

export default [
  {
    input: 'src/app.js',
    output: {
      file: 'out/app.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      includePaths({
        include: {
          'timezone-support': 'node_modules/timezone-support/dist/index-1970-2038.js'
        }
      }),
      commonjs(),
      cleanup()
    ]
  }
]
