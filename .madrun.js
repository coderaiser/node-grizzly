'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => 'echo "Error: no test specified" && exit 1',
};

