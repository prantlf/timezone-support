import cleanup from 'rollup-plugin-cleanup'

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
      cleanup()
    ]
  }
]
