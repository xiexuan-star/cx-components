import basicConfig, { name, file } from './rollup.config';

export default {
  ...basicConfig,
  output: {
    name: 'well-bricks',
    dir: 'lib',
    file: file('umd'),
    format: 'umd',
    globals: {
      'vue': 'Vue',
    },
    exports: 'named'
  }
};
