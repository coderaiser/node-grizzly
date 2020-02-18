'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => 'putout bin lib .madrun.js',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => 'echo "Error: no test specified" && exit 1',
};

