import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  name: 'simplyValid',
  output: {
    format: 'umd',
    file: 'dist/simply_valid.umd.js'
  },
  plugins: [
    buble()
  ]
};
