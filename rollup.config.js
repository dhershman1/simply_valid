import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'
import globby from 'globby'
import path from 'path'

const buildEntry = () => {
  const results = []
  const paths = globby.sync(['src/*.js', '!src/main.js', '!src/_internals'])

  paths.forEach(p => {
    const { name, base } = path.parse(p)

    const config = {
      input: p,
      plugins: [
        babel(),
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
}].concat(buildEntry())
