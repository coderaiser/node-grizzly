(function() {
    'use strict';
    
    var GitHubApi   = require('github'),
        
        github      = new GitHubApi({
            version: '3.0.0'
        });
        
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
    
})();
