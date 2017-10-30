import buble from 'rollup-plugin-buble';

export default {
  input: 'src/is/index.js',
  name: 'is',
  output: {
    format: 'umd',
    file: 'is/index.js'
  },
  plugins: [
    buble()
  ]
};
