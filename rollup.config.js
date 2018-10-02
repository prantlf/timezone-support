import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/index-2012-2022.js',
    output: {
      file: 'dist/index-2012-2022.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/lookup-convert.js',
    output: {
      file: 'dist/lookup-convert.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/lookup/data-2012-2022.js',
    output: {
      file: 'dist/data-2012-2022.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/parse-format.js',
    output: {
      file: 'dist/parse-format.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'timezone-support',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  },
  {
    input: 'src/index-2012-2022.js',
    output: {
      file: 'dist/index-2012-2022.umd.js',
      format: 'umd',
      name: 'timezone-support',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
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
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  },
  {
    input: 'src/lookup/data-2012-2022.js',
    output: {
      file: 'dist/data-2012-2022.umd.js',
      format: 'umd',
      name: 'timezone-data-2012-2022',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
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
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  }
]
