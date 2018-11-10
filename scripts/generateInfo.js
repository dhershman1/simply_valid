const fs = require('fs')
const path = require('path')
const jsDocParser = require('jsdoc-to-markdown')
const { version, description } = require('../package.json')
const ignoredFiles = ['_internals', 'esm', 'index.js']

const listFns = () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'src'))

  return files
    .filter(file => (/^[^._]/).test(file) && !ignoredFiles.includes(file))
    .map(file => ({
      name: file,
      path: `./src/${file}`
    }))
}

const generateUsage = name => ({
  'commonjs': {
    title: 'CommonJs',
    code: `const { ${name} } = require('simply_valid')`
  },
  'standard': {
    title: 'Standard',
    code: `import { ${name} } from 'simply_valid'`
  },
  'cdn': {
    title: 'CDN',
    code: `<script src="https://cdn.jsdelivr.net/npm/simply_valid@${version}/simply-valid.min.js"></script>`
  },
  'browser': {
    title: 'Browser',
    code: `<script src="path/to/simply_valid/dist/simply-valid.min.js"></script>`
  }
})

const generateSyntax = (name, args) => {
  if (!args) {
    return ''
  }

  const argsStr = args.map(a => a.optional ? `[${a.name}]` : a.name).join(', ')

  return `${name}(${argsStr})`
}

const generate = () => listFns().map(fn => jsDocParser.getTemplateDataSync({
  'files': fn.path,
  'no-cache': true
}))

const generated = generate()
const results = generated
  .reduce((acc, v) => {
    return [...acc, ...v]
  }, [])
  .map(doc => {
    const loc = doc.meta.filename.replace('.js', '')

    return {
      since: doc.since ? doc.since : 'Unknown',
      category: doc.category,
      title: doc.name,
      desc: doc.description,
      examples: doc.examples,
      returns: doc.returns,
      params: doc.params,
      syntax: generateSyntax(doc.name, doc.params),
      usage: generateUsage(doc.name, loc)
    }
  })

fs.writeFileSync('info.json', JSON.stringify({
  version,
  description,
  docs: results
}))
