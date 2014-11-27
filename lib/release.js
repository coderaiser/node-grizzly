(function() {
    'use strict';
    
    var GitHubApi   = require('github'),
        
        github      = new GitHubApi({
            version: '3.0.0'
        }),
        
        token   = '';
    
    module.exports  = function(token, options, callback) {
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
    };
    
    module.exports(token, {
        owner   : 'coderaiser',
        repo    : 'node-github',
        tag_name: 'v1.0.0',
        name    : 'Node-github v1.0.0',
        body    : 'first version of...'
        }, function(error) {
            if (error)
                console.error(error.message);
        });
    
})();
