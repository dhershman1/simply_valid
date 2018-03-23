import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './src/main/index.js',
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
    uglify()
  ],
  output: {
    file: './simply-valid.min.js',
    format: 'umd',
    name: 'simplyValid',
    exports: 'default'
  }
};
