import buble from 'rollup-plugin-buble';

export default {
  input: 'src/index.js',
  name: 'simplyValid',
  output: {
    format: 'umd',
    file: 'index.js'
  },
  plugins: [
    buble()
  ]
};
