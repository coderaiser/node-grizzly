#!/usr/bin/env node

'use strict';

const release = require('..');
const check = require('checkup');
const exec = require('execon');
const argv = process.argv;
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
        tn: 'token'
    }
});

const argsEmpty = Object.keys(args).length === 1;

if (args.version)
    version();
else if (args.help || argsEmpty)
    help();
else
    grizzly();

function grizzly() {
    const error   = exec.try(() => {
        check([
            args.repo,
            args.user,
            args.tagname,
            args.name,
            args.body
        ], [
            'repo',
            'user',
            'tagname',
            'name',
            'body'
        ]);
    });
    
    if (!error)
        release(args.token, {
            repo:             args.repo,
            user:             args.user,
            tag:              args.tag,
            target_commitish: args.target_commitish,
            name:             args.name,
            body:             args.body,
            prerelease:       args.prerelease
        }, log);
    
    log(error);
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
    
    Object.keys(bin).forEach((name) => {
        const line = '  ' + name + ' ' + bin[name];
        console.log(line);
    });
}

