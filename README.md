# Grizzly

Create release on github with help of node. To upload asset use [putasset](https://github.com/coderaiser/node-putasset "Putasset").

## Install

```
npm i grizzly -g
```
## How to use?

### Global

```
$ grizzly
Usage: grizzly [options]
Options:
  -h, --help       display this help and exit
  -v, --version    output version information and exit
  -r, --repo       name of repository
  -u, --user       user of repository
  -t, --tagname    tag of repository (shoul exist!)
  -n, --name       name of release
  -b, --body       body of release
  -p, --prerelease set prerelease
  --no-prerelease  unset prerelease (default)
  -tn, --token     github token <https://github.com/settings/tokens/new>

$ grizzly -tn "token from url" \
-r grizzly -u coderaiser -t v1.0.0 \
-n "grizzly v1.0.0" -b "some body"
```

### Local

```
npm i grizzly --save
```

Data will be read before execution in next order (left is more important):

`command line -> ~/.grizzly.json`

## Example

```js
var grizzly = require('grizzly'),
    token   = 'token from https://github.com/settings/applications';

grizzly(token, {
    user: 'coderaiser',
    repo: 'grizzly',
    tag: 'v1.0.0',
    name: 'grizzly v1.0.0',
    body: 'changelog'
    prerelease: false /* default */
}, function(error) {
    if (error)
        console.error(error.message);
});
```

## License

MIT

