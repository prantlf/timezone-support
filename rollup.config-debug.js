export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: 'inline'
    }
  },
  {
    input: 'src/lookup-convert.js',
    output: {
      file: 'dist/lookup-convert.js',
      format: 'cjs',
      sourcemap: 'inline'
    }
  },
  {
    input: 'src/parse-format.js',
    output: {
      file: 'dist/parse-format.js',
      format: 'cjs',
      sourcemap: 'inline'
    }
  }
]
