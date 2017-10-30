import buble from 'rollup-plugin-buble';

export default {
  input: 'src/no/index.js',
  name: 'no',
  output: {
    format: 'umd',
    file: 'no/index.js'
  },
  plugins: [
    buble()
  ]
};
