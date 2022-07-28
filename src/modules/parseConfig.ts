import { stat, writeFile, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import chalk from 'chalk'
import { build } from 'esbuild'
import yaml from 'js-yaml'
import stripJsonComments from 'strip-json-comments'
import type { WranglerConfiguration } from '../type'

const getStats = async (path: string) => {
  try {
    const stats = await stat(path)

    return stats
  } catch (err) {
    return undefined
  }
}

const buildConfig = async (path: string) => {
  await build({
    entryPoints: [path],
    format: 'cjs',
    bundle: true,
    minify: true,
    platform: 'node',
    external: ['esbuild'],
    outfile: join(__dirname, '../.cache/config.js')
  })
}

const loadExtendedConfig = async (config: WranglerConfiguration): Promise<WranglerConfiguration> => {
  try {
    if (!config.extends || (!config.extends.startsWith('http://') && !config.extends.startsWith('https://'))) return config

    const data = await (await fetch(config.extends)).text()

    if (!data || !config.extends.endsWith('.json')) return config

    await writeFile(join(__dirname, '../.cache/config.json'), data)

    config.extends = undefined

    const config2 = await parseConfig('wjson_internal:' + join(__dirname, '../.cache/config.json'))

    if (!config2) return config

    config = {
      ...config2,
      ...config
    }
    if (config.extends)
      return loadExtendedConfig(config)
  } catch (err) {
    return config
  }

  return config
}

export const parseConfig = async (path?: string) => {
  if (!path) path = process.cwd()

  const internalParsing = path.startsWith('wjson_internal:')

  if (internalParsing) path = path.replace('wjson_internal:', '')

  const stats = await getStats(path)
  
  if (!stats)
    return undefined

  let config: WranglerConfiguration

  try {
    if (stats.isFile()) {
      if (path.endsWith('.json')) {
        const c = await require(path)
  
        config = c
      } else if (path.endsWith('.jsonc')) {
        const c = await readFile(path, { encoding: 'utf-8' })

        config = JSON.parse(stripJsonComments(c))
      } else if (path.endsWith('.js')) {
        await buildConfig(path)
  
        const c = await require(join(__dirname, '../.cache/config.js'))
  
        config = c.default
      } else if (path.endsWith('.mjs')) {
        await buildConfig(path)
  
        const c = await require(join(__dirname, '../.cache/config.js'))
  
        config = c.default
      } else if (path.endsWith('.cjs')) {
        await buildConfig(path)
  
        const c = await require(join(__dirname, '../.cache/config.js'))
  
        config = c.default
      } else if (path.endsWith('.ts')) {
        await buildConfig(path)
  
        const c = await require(join(__dirname, '../.cache/config.js'))
  
        config = c.default
      } else if (path.endsWith('.yaml') || path.endsWith('.yml')) {
        const c = yaml.load(await readFile(path, 'utf8')) as WranglerConfiguration
  
        config = c
      } else {
        return undefined
      }
    } else {
      if ((await getStats(join(path, './wrangler.json')))?.isFile()) {
        const c = await require(join(path, './wrangler.json'))
  
        config = c
      } else if ((await getStats(join(path, './wrangler.jsonc')))?.isFile()) {
        const c = await readFile(join(path, './wrangler.jsonc'), { encoding: 'utf-8' })

        config = JSON.parse(stripJsonComments(c))
      } else if ((await getStats(join(path, './wrangler.js')))?.isFile()) {
        await buildConfig(join(path, './wrangler.js'))
  
        const c = await require(join(__dirname, '../.cache/config.js'))
  
        config = c.default
      } else if ((await getStats(join(path, './wrangler.mjs')))?.isFile()) {
        await buildConfig(join(path, './wrangler.mjs'))
  
        const c = await require(join(__dirname, '../.cache/config.js'))
  
        config = c.default
      } else if ((await getStats(join(path, './wrangler.cjs')))?.isFile()) {
        await buildConfig(join(path, './wrangler.cjs'))
  
        const c = await require(join(__dirname, '../.cache/config.js'))
  
        config = c.default
      } else if ((await getStats(join(path, './wrangler.ts')))?.isFile()) {
        await buildConfig(join(path, './wrangler.ts'))
  
        const c = await require(join(__dirname, '../.cache/config.js'))
  
        config = c.default
      } else if ((await getStats(join(path, './wrangler.yml')))?.isFile()) {
        const c = yaml.load(await readFile(join(path, './wrangler.yml'), 'utf8')) as WranglerConfiguration
  
        config = c
      } else if ((await getStats(join(path, './wrangler.yaml')))?.isFile()) {
        const c = yaml.load(await readFile(join(path, './wrangler.yaml'), 'utf8')) as WranglerConfiguration
  
        config = c
      } else {
        return undefined
      }
    }

    if (config.extends && !internalParsing) {
      config = await loadExtendedConfig(config)
    }
  
    return config
  } catch (err) {
    console.log(chalk.bold.redBright('error') + chalk.blackBright(' - cannot parse your config!'))
  }
}
