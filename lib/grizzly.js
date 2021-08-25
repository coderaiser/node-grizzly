import {join} from 'path';
import {Octokit} from '@octokit/rest';
import debug from 'debug';
const log = debug('grizzly');
import readjson from 'readjson';

import os from 'os';
const HOME = os.homedir();
const ERROR_TOKEN = 'File ~/.grizzly.json with token not found!';

export default async (token, options) => {
    if (!token) {
        const name = join(HOME, '.grizzly.json');
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
        owner: options.user,
        repo: options.repo,
        tag_name: options.tag,
        target_commitish: options.target_commitish,
        name: options.name,
        body: options.body,
        draft: options.draft,
        prerelease: options.prerelease,
    });
}

