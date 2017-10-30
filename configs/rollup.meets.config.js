import buble from 'rollup-plugin-buble';

export default {
  input: 'src/meets/index.js',
  name: 'meets',
  output: {
    format: 'umd',
    file: 'meets/index.js'
  },
  plugins: [
    buble()
  ]
};
