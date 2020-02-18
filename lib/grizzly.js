'use strict';

const {promisify} = require('util');

const path = require('path');
const Octokit = require('@octokit/rest').Octokit;
const log = require('debug')('grizzly');
const readjson = promisify(require('readjson'));

const HOME = require('os').homedir();
const ERROR_TOKEN = 'File ~/.grizzly.json with token not found!';

module.exports = async (token, options) => {
    if (!token) {
        const name = path.join(HOME, '.grizzly.json');
        const json = await readjson(name);
        token = json.token;
    }
    
    if (!token)
        throw Error(ERROR_TOKEN);
    
    await release(token, options);
};

async function release(token, options) {
    log(token, options);
    
    const octokit = new Octokit({
        auth: `token ${token}`,
    });
    
    await octokit.repos.createRelease({
        owner               : options.user,
        repo                : options.repo,
        tag_name            : options.tag,
        target_commitish    : options.target_commitish,
        name                : options.name,
        body                : options.body,
        draft               : options.draft,
        prerelease          : options.prerelease,
    });
}

