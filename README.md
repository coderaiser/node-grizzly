# Grizzly

Create release on github with help of node.

## Install

```
npm i grizzly -g
```
## How to use?

### Global

```
$ grizzly
-h, --help     : display this help and exit,
-v, --version  : output version information and exit,
-r, --repo     : name of repository,
-o, --owner    : owner of repository,
-t, --tagname  : tag of repository (shoul exist!),
-n, --name     : name of release,
-b, --body     : body of release,
-tn, --token   : github token <https://github.com/settings/tokens/new>

$ grizzly -tn "token from url" \
-r grizzly -o coderaiser -t v1.0.0 \
-n "grizzly v1.0.0" -b "some body"
```

### Local

```
npm i grizzly --save
```

## Example

```js
var release = require('grizzly'),
    token   = 'token from https://github.com/settings/applications';

release(token, {
    repo    : 'coderaiser',
    owner   : 'github-release,
    tag_name: 'v1.0.0',
    name    : 'github-release v1.0.0',
    body    : 'changelog'
}, function(error) {
    if (error)
        console.error(error.message);
});
```

## License

MIT
