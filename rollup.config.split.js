import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import globby from 'globby'
import path from 'path'
import uglify from 'rollup-plugin-uglify'

const buildEntry = () => {
  const results = []
  const paths = globby.sync(['src/*.js', '!src/main.js', '!src/_internals'])

  paths.forEach(p => {
    const { name, base } = path.parse(p)

    const config = {
      input: p,
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
            ['@babel/preset-stage-2', {
              'decoratorsLegacy': true
            }]
          ],
          exclude: 'node_modules/**',
          runtimeHelpers: true
        }),
        uglify(),
        filesize()
      ],
      output: {
        file: name === 'index' ? 'esm.js' : base,
        format: 'umd',
        name: name === 'index' ? 'esm' : name,
        exports: 'named'
      }
    }

    results.push(config)

    return true
  })

  return results
}

export default buildEntry()
