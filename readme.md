<div align='center'>
<h1>wjson</h1>
<b>✨ Configure Wrangler in the format of your choice. ✨</b>
</br>
</br>
</div>

## Installation

```bash
npm i -D @darkflare/wjson
```

## Usage (CLI)

Run the below command and **wjson** will automatically search for your configuration file and generate a `wrangler.toml` for you.

```bash
wjson
```

### Automatically Detectable Files

- `wrangler.json`
- `wrangler.js`
- `wrangler.mjs`
- `wrangler.cjs`
- `wrangler.ts`
- `wrangler.yaml`
- `wrangler.yml`

### Options

- `--config` to use a custom config, e.g. `wjson --config="./my.json"`

## Usage (API)

```javascript
import { join } from 'node:path'
import { generateConfig, parseConfig } from 'wjson'

// get the config from a file
const config = await parseConfig(join(someDirectory, './custom.json'))

// alternatively, you can only specify the directory name
const config = await parseConfig(someDirectory)

// generate a wrangler.toml from a config
await generateConfig(config)
```

## Config Files

`json`

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/azurydev/wjson/dev/schema.json",
  // your config (w/ autocomplete)
}
```

`js/mjs/ts`

```javascript
import { defineConfig } from 'wjson'

export default defineConfig({
 // your config (w/ autocomplete)
})
```

`js/cjs`

```javascript
const { defineConfig } = require('wjson')

module.exports = defineConfig({
 // your config (w/ autocomplete)
})
```

`yaml/yml`

```yml
accountId: '0123456789'

development:
  name: 'my-awesome-worker'

# your config
```

## Config Syntax

- all options must be specified in `camelCase`
- `vars` option was renamed to `variables`
- `nodeComp` option was renamed to `nodeCompatibility`
- any environment-related options must be specified under `development` *(global, default)*, `staging`, or `production`
