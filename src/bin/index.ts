import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import minimist from 'minimist'
import { generateConfig } from '../modules/generateConfig'
import { parseConfig } from '../modules/parseConfig'

(async () => {
  const argv = minimist(process.argv.slice(2))

  const config = await parseConfig(argv.config ? join(process.cwd(), argv.config) : process.cwd())

  if (!config)
    process.exit()

  const directory = argv.config ? dirname(join(process.cwd(), argv.config)) : process.cwd()

  await writeFile(join(directory, './wrangler.toml'), await generateConfig(config))
})()
