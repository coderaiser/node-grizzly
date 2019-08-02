#!/usr/bin/env node

'use strict';

const release = require('..');
const check = require('checkup');
const tryCatch = require('try-catch');
const {argv} = process;
const args = require('minimist')(argv.slice(2), {
    string: ['repo', 'user', 'tag', 'target_commitish', 'name', 'body', 'token'],
    boolean: ['prerelease'],
    alias: {
        v:  'version',
        h:  'help',
        r:  'repo',
        u:  'user',
        t:  'tag',
        tc: 'target_commitish',
        n:  'name',
        b:  'body',
        p:  'prerelease',
        tn: 'token',
    },
});

const argsEmpty = Object.keys(args).length === 1;

if (args.version)
    version();
else if (args.help || argsEmpty)
    help();
else
    grizzly();

function grizzly() {
    const [error] = tryCatch(() => {
        check([
            args.repo,
            args.user,
            args.tagname,
            args.name,
            args.body,
        ], [
            'repo',
            'user',
            'tagname',
            'name',
            'body',
        ]);
    });
    
    if (error)
        return log(error);
    
    release(args.token, {
        repo:             args.repo,
        user:             args.user,
        tag:              args.tag,
        target_commitish: args.target_commitish,
        name:             args.name,
        body:             args.body,
        prerelease:       args.prerelease,
    }).catch(log);
}

function log(error) {
    if (error)
        console.error(error.message);
}

function version() {
    console.log('v' + info().version);
}

function info() {
    return require('../package');
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

