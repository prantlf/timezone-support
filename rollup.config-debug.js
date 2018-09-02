import { cjs } from './rollup.config-cjs'

cjs.forEach(module => module.sourcemap = 'inline') // eslint-disable-line no-return-assign

export default cjs
