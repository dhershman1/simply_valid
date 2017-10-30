import buble from 'rollup-plugin-buble';

export default {
  input: 'src/has/index.js',
  name: 'has',
  output: {
    format: 'umd',
    file: 'has/index.js'
  },
  plugins: [
    buble()
  ]
};
