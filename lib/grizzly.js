'use strict';

const path = require('path');
const exec = require('execon');
const github = require('@octokit/rest')();
const readjson = require('readjson');
const log = require('debug')('grizzly');

const HOME = require('os').homedir();
const ERROR_TOKEN = 'File ~/.grizzly.json with token not found!';

module.exports = (token, options, callback) => {
    exec.if(token, () => {
        release(token, options, callback);
    }, (fn) => {
        const name = path.join(HOME, '.grizzly.json');
        
        readjson(name, (error, json) => {
            if (error)
                return callback(error);
            
            token = json.token;
            fn();
        });
    });
};

function release(token, options, callback) {
    log(token, options);
    
    if (!token)
        return callback(Error(ERROR_TOKEN));
        
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

