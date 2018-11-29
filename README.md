# Grizzly [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

Create release on github with help of node.

## Install

```
npm i grizzly -g
```
## How to use?

### Global

```
Usage: grizzly [options]
Options:
  -h, --help                  display this help and exit
  -v, --version               output version information and exit
  -r, --repo                  name of repository
  -u, --user                  user of repository
  -t, --tag                   tag of repository (shoul exist!)
  -n, --name                  name of release
  -b, --body                  body of release
  -p, --prerelease            set prerelease
  --no-prerelease             unset prerelease (default)
  -tn, --token                github token <https://github.com/settings/tokens/new>
  -tc, --target_commitish     commitish value that determines where the Git tag is created from

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
const grizzly = require('grizzly');
const token = 'token from https://github.com/settings/applications';

grizzly(token, {
    user: 'coderaiser',
    repo: 'grizzly',
    tag: 'v1.0.0',
    name: 'grizzly v1.0.0',
    body: 'changelog'
    prerelease: false /* default */
}).catch((error) => {
    console.error(error.message);
});
```

## Related

- [putasset](https://github.com/coderaiser/node-putasset "Putasset") Upload asset to release on github.


## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/grizzly.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/node-grizzly.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/grizzly "npm"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/node-grizzly "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

