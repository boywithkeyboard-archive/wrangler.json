import { stat } from 'node:fs/promises'
import { join } from 'node:path'
import { build } from 'esbuild'
import type { WranglerConfig } from '../type'

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

export const parseConfig = async (path?: string) => {
  if (!path) path = process.cwd()

  const stats = await getStats(path)
  
  if (!stats)
    return undefined

  let config: WranglerConfig

  if (stats.isFile()) {
    if (path.endsWith('.json')) {
      const c = await require(path)

      config = c
    }
    
    if (path.endsWith('.js')) {
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
    } else {
      return undefined
    }
  } else {
    if ((await getStats(join(path, './wrangler.json')))?.isFile()) {
      const c = await require(join(path, './wrangler.json'))

      config = c
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
    } else {
      return undefined
    }
  }

  return config
}
