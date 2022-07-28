#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import minimist from 'minimist'
import { generate } from '../modules/generate'
import { parse } from '../modules/parse'

(async () => {
  const argv = minimist(process.argv.slice(2))

  const config = await parse(argv.config ? join(process.cwd(), argv.config) : process.cwd())

  if (!config)
    process.exit()

  const directory = argv.config ? dirname(join(process.cwd(), argv.config)) : process.cwd()

  const wranglerConfig = await generate(config)

  if (!wranglerConfig)
    process.exit()

  await writeFile(join(directory, './wrangler.toml'), wranglerConfig)
})()
