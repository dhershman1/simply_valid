import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'

export default [{
  input: './src/main.js',
  plugins: [
    babel(),
    uglify(),
    filesize()
  ],
  output: {
    file: './dist/simply-valid.min.js',
    format: 'umd',
    name: 'simplyValid',
    exports: 'default'
  }
}, {
  input: './src/main.js',
  plugins: [
    babel(),
    cleanup(),
    filesize()
  ],
  output: {
    file: './dist/simply-valid.js',
    format: 'umd',
    name: 'simplyValid',
    exports: 'default'
  }
}]
