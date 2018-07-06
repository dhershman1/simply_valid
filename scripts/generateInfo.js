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

const generateUsage = (name, loc) => {
  if (loc === 'main') {
    return {
      'commonjs': {
        title: 'CommonJs',
        code: `const simplyValid = require('simply_valid')`
      },
      'standard': {
        title: 'Standard',
        code: `import simplyValid from 'simply_valid'`
      },
      'cdn': {
        title: 'CDN (Prod)',
        code: `<script src="https://cdn.jsdelivr.net/npm/simply_valid@${version}/dist/${name}.min.js"></script>`
      },
      'cdn': {
        title: 'CDN (Dev)',
        code: `<script src="https://cdn.jsdelivr.net/npm/simply_valid@${version}/dist/${name}.js"></script>`
      },
      'browser': {
        title: 'Browser',
        code: `<script src="path/to/simply_valid/${name}.js"></script>`
      }
    }
  }

  return {
    'commonjs': {
      title: 'CommonJs',
      code: `const { ${name} } = require('simply_valid/${loc}')`
    },
    'standard': {
      title: 'Standard',
      code: `import { ${name} } from 'simply_valid/${loc}'`
    },
    'cdn': {
      title: 'CDN',
      code: `<script src="https://cdn.jsdelivr.net/npm/simply_valid@${version}/${loc}.js"></script>`
    },
    'browser': {
      title: 'Browser',
      code: `<script src="path/to/simply_valid/${loc}/index.js"></script>`
    }
  }
}

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

const generated = generate();
let cleanRes = generated.reduce((acc, v) => {
  return [...acc, ...v]
}, [])

const results = cleanRes.map(doc => {
  const loc = doc.meta.filename.replace('.js', '')

  return {
    since: doc.since ? doc.since : 'Unknown',
    category: doc.category,
    title: doc.name,
    desc: doc.docescription,
    examples: doc.examples,
    returns: doc.returns,
    params: doc.params,
    syntax: generateSyntax(doc.name, doc.params),
    usage: generateUsage(doc.name, loc)
  }
})

fs.writeFileSync('.github/info.json', JSON.stringify({
  version,
  description,
  docs: results,
  returns: [
    // Passing Validation
    {
      isValid: true,
      story: []
    },

    // Failing returns will look like this
    {
      isValid: false,
      story: [{
        test: "isNumber",
        value: "cool"
      }]
    }
  ]
}))
