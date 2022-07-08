# Changelog

## v0.3.0

### Breaking Changes

- [**#3**](https://github.com/azurydev/wjson/pull/3) - refactor!: raise required node version

  Need to raise the required node version in `engines` field to `v18` due to new `extends` option.

### New Features

- [**#2**](https://github.com/azurydev/wjson/pull/2) - feat: add `extends` option

  Extend your configuration with an external configuration. This functionality has an infinite depth. **Currently, only JSON file imports via HTTP/HTTPS are supported.**

  ```jsonc
  {
    "extends": "https://example.com/other_config.json",
    // overwrite the options of the config you're extending or add other options
  }

- [**#4**](https://github.com/azurydev/wjson/pull/4) - feat: add yaml support

  Add support for `wrangler.yaml` and `wrangler.yml` files.

## v0.2.0

### Breaking Changes

- renamed package to `@darkflare/wjson`

### Bug Fixes

- added missing `#!/usr/bin/env node` to the start of the bin file
