import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'

export default [{
  input: './src/main.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            'targets': {
              'browsers': [
                'last 2 versions',
                'ie >= 9'
              ]
            },
            'modules': false
          }
        ],
        '@babel/preset-stage-2'
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
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
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            'targets': {
              'browsers': [
                'last 2 versions',
                'ie >= 9'
              ]
            },
            'modules': false
          }
        ],
        '@babel/preset-stage-2'
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
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
