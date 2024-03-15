import {run} from 'madrun';

export default {
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => `echo "would be great to have one ;)"`,
};
