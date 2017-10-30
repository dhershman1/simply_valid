import buble from 'rollup-plugin-buble';

export default {
  input: 'src/esm/index.js',
  name: 'esm',
  output: {
    format: 'umd',
    file: 'esm/index.js'
  },
  plugins: [
    buble()
  ]
};
