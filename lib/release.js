(function() {
    'use strict';
    
    var exec        = require('execon'),
        GitHubApi   = require('github'),
        readjson    = require('readjson'),
        log         = require('debug')('grizzly'),
        
        ERROR_TOKEN = 'File ~/.grizzly.json with token not found!',
        
        HOME_WIN    = process.env.HOMEPATH,
        HOME_UNIX   = process.env.HOME,
        HOME        = (HOME_UNIX || HOME_WIN) + '/',
        
        github      = new GitHubApi({
            version: '3.0.0'
        });
        
    module.exports  = function(token, options, callback) {
        var name = HOME + '.grizzly.json';
        
        exec.if(token, function() {
            release(token, options, callback);
        }, function(fn) {
            readjson(name, function(error, json) {
                if (!error)
                    token = json.token;
                
                fn();
            });
        });
    };
    
    function release(token, options, callback) {
        log(token, options);
        
        if (!token) {
            callback(Error(ERROR_TOKEN));
        } else {
            github.authenticate({
                type: 'oauth',
                token: token
            });
            
            github.releases.createRelease({
                owner               : options.owner,
                repo                : options.repo,
                tag_name            : options.tag_name,
                name                : options.name,
                body                : options.body
            }, callback);
        }
    }
})();
