#!/usr/bin/env node

(function() {
    'use strict';
    
    var release     = require('..'),
        
        HOME_WIN    = process.env.HOMEPATH,
        HOME_UNIX   = process.env.HOME,
        
        HOME        = (HOME_UNIX || HOME_WIN) + '/',
        
        check       = require('checkup'),
        exec        = require('execon'),
        tryRequire  = require('tryrequire'),
        
        argv        = process.argv,
        args        = require('minimist')(argv.slice(2), {
            string: ['repo', 'owner', 'tagname', 'name', 'body', 'token'],
            alias: {
                v: 'version',
                h: 'help',
                r: 'repo',
                o: 'owner',
                t: 'tagname',
                n: 'name',
                b: 'body',
                tn: 'token'
            }
        }),
        
        argsEmpty   = Object.keys(args).length === 1,
        
        config      = tryRequire(HOME + '.github-release') || {
            token: args.token
        };
    
    if (args.version)
        version();
    else if (args.help || argsEmpty)
        help();
    else if (!config.token)
        console.error([
            'File ~/.github-release.json with token not found!',
            'Please set --token parameter'
        ].join('\n'));
    else
        grizzly(config.token);
    
    function grizzly(token) {
        var error   = exec.try(function() {
            check([
                token,
                args.repo,
                args.owner,
                args.tagname,
                args.name,
                args.body], [
                'token',
                'repo',
                'owner',
                'tagname',
                'name',
                'body'
            ]);
        });
        
        if (!error)
            release(token, {
                repo    : args.repo,
                owner   : args.owner,
                tag_name: args.tagname,
                name    : args.name,
                body    : args.body
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
        var bin         = require('../json/bin'),
            usage       = 'Usage: ' + info().name + ' [options]';
            
        console.log(usage);
        console.log('Options:');
        
        Object.keys(bin).forEach(function(name) {
            var line = '  ' + name + ' ' + bin[name];
            console.log(line);
        });
    }
})();
