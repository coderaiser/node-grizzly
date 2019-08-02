'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => 'eslint bin lib madrun.js',
    'fix:lint': () => run('lint', '--fix'),
    'putout': () => 'putout bin lib madrun.js',
    'test': () => 'echo "Error: no test specified" && exit 1',
};

