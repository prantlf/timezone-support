import babel from 'rollup-plugin-babel'
import clean from 'rollup-plugin-clean'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/index-1970-2038.js',
    output: {
      file: 'dist/index-1970-2038.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/index-2012-2022.js',
    output: {
      file: 'dist/index-2012-2022.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/index-1900-2050.js',
    output: {
      file: 'dist/index-1900-2050.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/lookup-convert.js',
    output: {
      file: 'dist/lookup-convert.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/lookup/data.js',
    output: {
      file: 'dist/data.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/lookup/data-1970-2038.js',
    output: {
      file: 'dist/data-1970-2038.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/lookup/data-2012-2022.js',
    output: {
      file: 'dist/data-2012-2022.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/lookup/data-1900-2050.js',
    output: {
      file: 'dist/data-1900-2050.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/parse-format.js',
    output: {
      file: 'dist/parse-format.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      clean()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'timezoneSupport',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  },
  {
    input: 'src/index-1970-2038.js',
    output: {
      file: 'dist/index-1970-2038.umd.js',
      format: 'umd',
      name: 'timezoneSupport',
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
      name: 'timezoneSupport',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  },
  {
    input: 'src/index-1900-2050.js',
    output: {
      file: 'dist/index-1900-2050.umd.js',
      format: 'umd',
      name: 'timezoneSupport',
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
      name: 'timezoneSupport',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  },
  {
    input: 'src/lookup/data.js',
    output: {
      file: 'dist/data.umd.js',
      format: 'umd',
      name: 'timezoneData',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  },
  {
    input: 'src/lookup/data-1970-2038.js',
    output: {
      file: 'dist/data-1970-2038.umd.js',
      format: 'umd',
      name: 'timezoneData',
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
      name: 'timezoneData',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  },
  {
    input: 'src/lookup/data-1900-2050.js',
    output: {
      file: 'dist/data-1900-2050.umd.js',
      format: 'umd',
      name: 'timezoneData',
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
      name: 'timezoneParseFormat',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  }
]
