import basicConfig, { name, file } from './rollup.config';

export default {
  ...basicConfig,
  output: {
    name,
    // dir: 'dist',
    file: file('esm'),
    format: 'es'
  }
};
