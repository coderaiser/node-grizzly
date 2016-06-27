#!/usr/bin/env node

(function() {
    'use strict';
    
    var release     = require('..'),
        
        check       = require('checkup'),
        exec        = require('execon'),
        
        argv        = process.argv,
        args        = require('minimist')(argv.slice(2), {
            string: ['repo', 'user', 'tag', 'name', 'body', 'token'],
            boolean: ['prerelease'],
            alias: {
                v: 'version',
                h: 'help',
                r: 'repo',
                u: 'user',
                t: 'tag',
                n: 'name',
                b: 'body',
                p: 'prerelease',
                tn: 'token'
            }
        }),
        
        argsEmpty   = Object.keys(args).length === 1;
    
    if (args.version)
        version();
    else if (args.help || argsEmpty)
        help();
    else
        grizzly();
    
    function grizzly() {
        var error   = exec.try(function() {
            check([
                args.repo,
                args.user,
                args.tagname,
                args.name,
                args.body], [
                'repo',
                'user',
                'tagname',
                'name',
                'body'
            ]);
        });
        
        if (!error)
            release(args.token, {
                repo: args.repo,
                user: args.user,
                tag: args.tag,
                name: args.name,
                body: args.body,
                prerelease: args.prerelease
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
        var bin         = require('../help'),
            usage       = 'Usage: ' + info().name + ' [options]';
            
        console.log(usage);
        console.log('Options:');
        
        Object.keys(bin).forEach(function(name) {
            var line = '  ' + name + ' ' + bin[name];
            console.log(line);
        });
    }
})();
