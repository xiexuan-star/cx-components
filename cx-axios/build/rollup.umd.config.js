import basicConfig, { file } from './rollup.config'
export default {
  ...basicConfig,
  output: {
    name: 'well-bricks',
    file: file('umd'),
    format: 'umd',
    exports: 'named'
  }
}
