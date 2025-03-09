#!/usr/bin/env node

import {createRequire} from 'node:module';
import process from 'node:process';
import check from 'checkup';
import tryCatch from 'try-catch';
import minimist from 'minimist';
import release from '../lib/grizzly.js';

const argv = process.argv.slice(2);
const require = createRequire(import.meta.url);
const info = () => require('../package');

const args = minimist(argv, {
    string: [
        'repo',
        'user',
        'tag',
        'target_commitish',
        'name',
        'body',
        'token',
    ],
    boolean: ['prerelease'],
    alias: {
        v: 'version',
        h: 'help',
        r: 'repo',
        u: 'user',
        t: 'tag',
        tc: 'target_commitish',
        n: 'name',
        b: 'body',
        p: 'prerelease',
        tn: 'token',
    },
});

if (args.version)
    version();
else if (args.help || !argv.length)
    help();
else
    grizzly();

function grizzly() {
    const [error] = tryCatch(() => {
        check([
            args.repo,
            args.user,
            args.tag,
            args.name,
            args.body,
        ], [
            'repo',
            'user',
            'tag',
            'name',
            'body',
        ]);
    });
    
    if (error)
        return log(error);
    
    release(args.token, {
        repo: args.repo,
        user: args.user,
        tag: args.tag,
        target_commitish: args.target_commitish,
        name: args.name,
        body: args.body,
        prerelease: args.prerelease,
    }).catch(log);
}

function log(error) {
    if (error)
        console.error(error.message);
}

function version() {
    console.log('v' + info().version);
}

function help() {
    const bin = require('../help');
    const usage = 'Usage: ' + info().name + ' [options]';
    
    console.log(usage);
    console.log('Options:');
    
    for (const name of Object.keys(bin)) {
        const line = '  ' + name + ' ' + bin[name];
        console.log(line);
    }
}
