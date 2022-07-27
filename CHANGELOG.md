# @darkflare/wjson

## 0.4.3

### Patch Changes

- [#33](https://github.com/darkflarengine/wjson/pull/33) [`5f25636`](https://github.com/darkflarengine/wjson/commit/5f2563606c80bb5043d2c6c3557111f61afbaa23) Thanks [@unvented](https://github.com/unvented)! - docs: add contact section to readme

## 0.4.2

### Patch Changes

- [#29](https://github.com/darkflarengine/wjson/pull/29) [`f106363`](https://github.com/darkflarengine/wjson/commit/f106363a5f3503611282f4de0761597ad6bd116f) Thanks [@unvented](https://github.com/unvented)! - test: fix config loaded via `extends` option

* [#28](https://github.com/darkflarengine/wjson/pull/28) [`4528f58`](https://github.com/darkflarengine/wjson/commit/4528f58dc4f015e7c1dae74161c3239fd2e1c066) Thanks [@unvented](https://github.com/unvented)! - fix: spacing after `route` option in output file

- [#26](https://github.com/darkflarengine/wjson/pull/26) [`56c9884`](https://github.com/darkflarengine/wjson/commit/56c98842205c7e233863c332b2046660f5ca6935) Thanks [@unvented](https://github.com/unvented)! - feat: add support for `.jsonc` files

  Add support for `.jsonc` files, aka. json files with comments.

## 0.4.1

### Patch Changes

- [#21](https://github.com/darkflarengine/wjson/pull/21) [`c2c08a2`](https://github.com/darkflarengine/wjson/commit/c2c08a2f25890f3f472ad5573bf0d1c613070814) Thanks [@unvented](https://github.com/unvented)! - chore: move repo to `darkflarengine` org

  Move `wjson` to the `darkflarengine` organization, since it was mainly developed for [darkflare](https://github.com/azurydev/darkflare).

## 0.4.0

### Minor Changes

- [#17](https://github.com/azurydev/wjson/pull/17) [`52b884e`](https://github.com/azurydev/wjson/commit/52b884ea22875b3b6bc53d7f1aee5429e67366e7) Thanks [@unvented](https://github.com/unvented)! - refactor!: move env related config under `env` key

  Move all environment-related settings under the `env` key to avoid confusion.

## 0.3.1

### Patch Changes

- [#6](https://github.com/azurydev/wjson/pull/6) [`c7aa4c1`](https://github.com/azurydev/wjson/commit/c7aa4c16248422eaa4c8f6b0ba5f15c967392b9f) Thanks [@unvented](https://github.com/unvented)! - feat: add basic error logging

  Print errors to the console.

* [#8](https://github.com/azurydev/wjson/pull/8) [`e0d6bbc`](https://github.com/azurydev/wjson/commit/e0d6bbc1eb1a40c08a658dda1688739a7ebce2b4) Thanks [@unvented](https://github.com/unvented)! - refactor: exclude cli from typescript compilation

  Exclude CLI file from TypeScript compilation to reduce package size. No change for users since the code is internal anyway.
