const fs = require('fs');
const path = require('path');
const jsDocParser = require('jsdoc-to-markdown');
const ignoredFiles = ['_internals', 'esm', 'combo', 'main'];

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

const generateUsage = name => ({
  'commonjs': {
    title: 'CommonJs',
    code: `const ${name} = require('simply_valid/${name}');`
  },
  'standard': {
    title: 'Standard',
    code: `import ${name} from 'simply_valid/${name}';`
  },
  'browser': {
    title: 'Browser',
    code: `<script src="path/to/node_modules/simply_valid/${name}/index.js"></script>`
  }
});

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


generated = cleanRes.map(doc => ({
  title: doc.name,
  syntax: generateSyntax(doc.name, doc.params),
  usage: generateUsage(doc.name),
  desc: doc.description,
  examples: doc.examples,
  params: doc.params,
  returns: doc.returns
}));

writeDocs(generated);
