'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => run(['putout', 'lint:*']),
    'lint:lib': () => 'eslint lib madrun.js',
    'lint:bin': () => 'eslint --rule \'no-console:0\' bin',
    'fix:lint': () => run(['putout', 'lint:*'], '--fix'),
    'putout': () => 'putout bin lib madrun.js',
    'test': () => 'echo "Error: no test specified" && exit 1',
};

