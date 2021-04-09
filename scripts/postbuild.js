const { copyFileSync, existsSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');
const pkg = require('../package.json');

const basePath = resolve(__dirname, '../');
const distPath = resolve(__dirname, '../dist');

writeFileSync(join(distPath, 'package.json'), JSON.stringify({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    main: 'index.js',
    repository: pkg.repository,
    contributors: pkg.contributors,
    license: pkg.license,
    bugs: pkg.bugs,
    homepage: pkg.homepage
}, null, 4));

copyFileSync(join(basePath, 'README.md'), join(distPath, 'README.md'));
copyFileSync(join(basePath, 'LICENSE'), join(distPath, 'LICENSE'));

if (existsSync(join(basePath, '.npmrc'))) {
    copyFileSync(join(basePath, '.npmrc'), join(distPath, '.npmrc'));
}
