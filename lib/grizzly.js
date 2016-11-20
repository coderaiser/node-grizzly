'use strict';

var path        = require('path'),
    exec        = require('execon'),
    GitHubApi   = require('github'),
    readjson    = require('readjson'),
    log         = require('debug')('grizzly'),

    HOME        = require('os-homedir')(),
    ERROR_TOKEN = 'File ~/.grizzly.json with token not found!',

    github      = new GitHubApi({
        version: '3.0.0'
    });

module.exports  = function(token, options, callback) {
    exec.if(token, function() {
        release(token, options, callback);
    }, function(fn) {
        var name = path.join(HOME, '.grizzly.json');

        readjson(name, function(error, json) {
            if (error) {
                callback(error);
            } else {
                token = json.token;
                fn();
            }
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

        github.repos.createRelease({
            owner               : options.user,
            repo                : options.repo,
            tag_name            : options.tag,
            target_commitish    : options.target_commitish,
            name                : options.name,
            body                : options.body,
            prerelease          : options.prerelease
        }, callback);
    }
}
