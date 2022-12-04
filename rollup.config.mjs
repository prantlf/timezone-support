import { babel } from '@rollup/plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import { minify } from 'rollup-plugin-swc-minify'

const babelOptions = {
  exclude: 'node_modules/**',
  babelHelpers: 'bundled'
}

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/index-1970-2038.js',
    output: [
      {
        file: 'dist/index-1970-2038.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index-1970-2038.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/index-2012-2022.js',
    output: [
      {
        file: 'dist/index-2012-2022.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index-2012-2022.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/index-1900-2050.js',
    output: [
      {
        file: 'dist/index-1900-2050.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index-1900-2050.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/lookup-convert.js',
    output: [
      {
        file: 'dist/lookup-convert.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/lookup-convert.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/lookup/data.js',
    output: [
      {
        file: 'dist/data.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/data.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/lookup/data-1970-2038.js',
    output: [
      {
        file: 'dist/data-1970-2038.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/data-1970-2038.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/lookup/data-2012-2022.js',
    output: [
      {
        file: 'dist/data-2012-2022.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/data-2012-2022.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/lookup/data-1900-2050.js',
    output: [
      {
        file: 'dist/data-1900-2050.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/data-1900-2050.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
    ]
  },
  {
    input: 'src/parse-format.js',
    output: [
      {
        file: 'dist/parse-format.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/parse-format.mjs',
        sourcemap: true
      }
    ],
    plugins: [
      babel(babelOptions),
      cleanup()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
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
      babel(babelOptions),
      minify()
    ]
  }
]
