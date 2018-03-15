const fs = require('fs');
const path = require('path');
const jsDocParser = require('jsdoc-to-markdown');
const ignoredFiles = ['_internals', 'esm'];

const listFns = () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'src'));

  return files
    .filter(file => (/^[^._]/).test(file) && !ignoredFiles.includes(file))
    .map(file => ({
      name: file,
      path: `./${file}`,
      fullPath: `./src/${file}/index.js`
    }));
};

const writeDocs = fileObj => fs.writeFileSync('docs.js', `module.exports = ${JSON.stringify(fileObj)}`);

const generateUsage = (name, loc) => {
  if (loc === 'main') {
    return {
      'commonjs': {
        title: 'CommonJs',
        code: `const simplyValid = require('simply_valid');`
      },
      'standard': {
        title: 'Standard',
        code: `import simplyValid from 'simply_valid';`
      },
      'browser': {
        title: 'Browser',
        code: `<script src="path/to/simply_valid/${loc}/index.js"></script>`
      }
    };
  }

  return {
    'commonjs': {
      title: 'CommonJs',
      code: `const { ${name} } = require('simply_valid/${loc}');`
    },
    'standard': {
      title: 'Standard',
      code: `import { ${name} } from 'simply_valid/${loc}';`
    },
    'browser': {
      title: 'Browser',
      code: `<script src="path/to/simply_valid/${loc}/index.js"></script>`
    }
  };
};

const generateSyntax = (name, args) => {
  if (!args) {
    return '';
  }

  const argsStr = args.map(a => a.optional ? `[${a.name}]` : a.name).join(', '); // eslint-disable-line

  return `${name}(${argsStr})`;
};

const generateSourceDocs = () => listFns().map(fn => jsDocParser.getTemplateDataSync({
  'files': fn.fullPath,
  'no-cache': true
}));

let generated = generateSourceDocs();
let cleanRes = [];

generated.forEach(v => {
  cleanRes = [...cleanRes, ...v];
});

const sortFns = (a, b) => {
  if (a.title < b.title || a.title === 'simplyValid') {
    return -1;
  }

  if (a.title > b.title) {
    return 1;
  }

  return 0;
};

generated = cleanRes.map(doc => {
  const pathArr = doc.meta.path.split('\\');
  const loc = pathArr[pathArr.length - 1];

  return {
    title: doc.name,
    since: doc.since,
    category: doc.category,
    syntax: generateSyntax(doc.name, doc.params),
    usage: generateUsage(doc.name, loc),
    desc: doc.description,
    examples: doc.examples,
    params: doc.params,
    returns: doc.returns,
    properties: doc.properties
  };
});

writeDocs(generated.sort(sortFns));
