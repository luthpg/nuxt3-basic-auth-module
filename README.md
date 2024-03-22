# 🔐 Nuxt3 Basic Auth Module

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->

Basic Authentication Module for Nuxt3.

Your Nuxt app can be protected, and allow accessing particular path (e.g. `'/api/user/*'` ) without basic authentication.

*Extended from mofule [monsat/nuxt-basic-auth-module](https://github.com/monsat/nuxt-basic-auth-module), Special Thanks*

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/luthpg/nuxt3-basic-auth-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🔐 &nbsp;Protect your Nuxt.js(v3) app by Basic-Auth
- 🤍 &nbsp;Exclude particular request path with `whiteList`, or production domain with `productionDomain`

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @luthpg/nuxt3-basic-auth-module

# or, install by manual and you must setup in nuxt.config.ts

npm install -D @luthpg/nuxt3-basic-auth-module
```

That's it! You can now use Nuxt3 Basic Auth Module in your Nuxt app ✨

## Usage

```ts
// nuxt.config.ts

import BasicAuth from '@luthpg/nuxt3-basic-auth-module';

export default defineNuxtConfig({
  modules: [
    BasicAuth,
  ],
});
```

## Options

### Module Options

```ts
// nuxt.config.ts

import BasicAuth from '@luthpg/nuxt3-basic-auth-module';

export default defineNuxtConfig({
  modules: [
    [
      BasicAuth,
      { enabled: process.env.IS_PROD !== '1', }
    ]
  ],
});
```

#### enabled: boolean

If set to `false`, skip registration authentication handler.

---

### Runtime config

```ts
// type definision
interface RuntimeConfig {
  basicAuth: {
    productionDomains?: string[];
    pairs?: Record<string, string>;
    whiteList?: string[];
    realm?: string;
  };
};
```

#### productionDomains: string[]

Authentication is not required in these domains.

`['foo.example.com']` matches also `bar.foo.example.com` (endWith match).

#### pairs: Record<string, string>

you can set authentication info like:

```ts
// nuxt.config.ts

import BasicAuth from '@luthpg/nuxt3-basic-auth-module';

export default defineNuxtConfig({
  modules: [BasicAuth],
  runtimeConfig: {
    basicAuth: {
      // configure like:
      pairs: {
        admin: 'passAdmin',
        user: 'passUser',
      },
    },
  },
});
```

default pair is `{ admin: 'admin' }`.

#### whiteList: string[]

Also, authentication is not required in these pass.

`['/api/*', '/global/page/*']` matches `/api/foo/bar`, `/global/page/1`.

#### realm: string

set realm, if needed.


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/github/v/release/luthpg/nuxt3-basic-auth-module?style=flat&logoColor=020420&color=00DC82
[npm-version-href]: https://github.com/luthpg/nuxt3-basic-auth-module/pkgs/npm/nuxt3-basic-auth-module

<!-- [npm-downloads-src]: https://img.shields.io/npm/dm/nuxt3-basic-auth-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://github.com/luthpg/nuxt3-basic-auth-module/pkgs/npm/nuxt3-basic-auth-module -->

[license-src]: https://img.shields.io/github/license/luthpg/nuxt3-basic-auth-module?style=flat&logoColor=020420&color=00DC82
[license-href]: https://github.com/luthpg/nuxt3-basic-auth-module/pkgs/npm/nuxt3-basic-auth-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
