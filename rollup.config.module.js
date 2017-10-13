import buble from 'rollup-plugin-buble';

export default {
  input: 'src/index.js',
  name: 'simplyValid',
  output: {
    format: 'cjs',
    file: 'dist/simply_valid.cjs.js'
  },
  plugins: [
    buble()
  ]
};
