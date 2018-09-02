import { terser } from 'rollup-plugin-terser'
import { cjs } from './rollup.config-cjs'

export default cjs.concat([
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'timezone-support',
      sourcemap: true
    },
    plugins: [
      terser()
    ]
  },
  {
    input: 'src/lookup-convert.js',
    output: {
      file: 'dist/lookup-convert.umd.js',
      format: 'umd',
      name: 'timezone-lookup-convert',
      sourcemap: true
    },
    plugins: [
      terser()
    ]
  },
  {
    input: 'src/parse-format.js',
    output: {
      file: 'dist/parse-format.umd.js',
      format: 'umd',
      name: 'timezone-parse-format',
      sourcemap: true
    },
    plugins: [
      terser()
    ]
  }
])
