(function() {
    'use strict';
    
    var fs          = require('fs'),
        exec        = require('execon'),
        GitHubApi   = require('github'),
        
        ERROR_TOKEN = 'File ~/.grizzly.json with token not found!',
        
        github      = new GitHubApi({
            version: '3.0.0'
        });
        
    module.exports  = function(token, options, callback) {
        exec.if(token, function() {
            release(token, options, callback);
        }, function(fn) {
            readConfig(function(error, json) {
                if (!error)
                    token = json.token;
                
                fn();
            });
        });
    };
    
    function release(token, options, callback) {
        if (!token)
            callback(Error(ERROR_TOKEN));
        else {
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
    
    function readConfig(callback) {
        var HOME_WIN    = process.env.HOMEPATH,
            HOME_UNIX   = process.env.HOME,
            
            HOME        = (HOME_UNIX || HOME_WIN) + '/';
        
        fs.readFile(HOME + '.grizzly.json', 'utf8', function(error, data) {
            var json;
            
            if (!error)
                error = exec.try(function() {
                    json = JSON.parse(data);
                });
            
            callback(error, json);
        });
    }
    
})();
