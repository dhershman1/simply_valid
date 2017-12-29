const path = require('path');
const fs = require('fs');
const del = require('del');

const fileList = fs.readdirSync(path.join(__dirname, '..'));

const specialCases = [
  '.git',
  '.gitignore',
  '.npmignore',
  'node_modules',
  'src',
  'scripts',
  'old-changelogs',
  'old-readmes',
  '.babelrc'
];
const results = fileList.filter(f => {
  const { ext, name } = path.parse(f);

  return !ext && specialCases.indexOf(name) === -1;
});

del(results).then(() => {
  console.info('Finished Cleaning Up');
});
