import chalk from 'chalk'
import type { WranglerConfiguration } from '../type'

export const generate = async (c: WranglerConfiguration) => {
  try {
    let config = ''
  
    config += `\naccount_id = "${c.accountId}"`
  
    if (c.workersDev)
      config += `\nworkers_dev = ${c.workersDev}`
  
    if (c.main)
      config += `\nmain = "${c.main}"`
  
    if (c.usageModel)
      config += `\nusage_model = "${c.usageModel}"`
  
    if (c.compatibilityDate)
      config += `\ncompatibility_date = "${c.compatibilityDate}"`
  
    if (c.compatibilityFlags)
      config += `\ncompatibility_flags = ${JSON.stringify(c.compatibilityFlags)}`
  
    if (c.r2Buckets) {
      config += '\nr2_buckets = [\n'
    
      for (const b of c.r2Buckets) {
        config += `  { binding = "${b.binding}", bucket_name = "${b.bucketName}", preview_bucket_name = "${b.previewBucketName}" },`
      }
    
      config += '\n]'
    }
  
    if (c.tsconfig)
      config += `\ntsconfig = "${c.tsconfig}"`
  
    if (c.minify)
      config += `\nminify = ${c.minify}`
  
    if (c.nodeCompatibility)
      config += `\nnode_compat = ${c.nodeCompatibility}`
  
    if (c.services) {
      config += `\n\nservices = [\n`
    
      
      for (const s of c.services) {
        config += `  { binding = "${s.binding}", environment = "${s.environment}", service = "${s.service}" },`
      }
      
      config += '\n]\n'
    }
  
    if (c.env.development) {
      if (c.env.development.name)
        config += `name = "${c.env.development.name}"\n`
  
      if (c.env.development.route && typeof c.env.development.route === 'string')
        config += `route = "${c.env.development.route}"\n`
      else if (typeof c.env.development.route === 'object')
        config += `route = { pattern = "${c.env.development.route.pattern}"${c.env.development.route.zoneName ? `, zone_name = "${c.env.development.route.zoneName}"` : ''}${c.env.development.route.zoneId ? `, zone_id = "${c.env.development.route.zoneId}"` : ''} }\n`
  
      if (c.env.development.routes && typeof c.env.development.routes[0] === 'string') {
        config += `routes = ${JSON.stringify(c.env.development.routes)}\n`
      } else if (c.env.development.routes && typeof c.env.development.routes[0] === 'object') {
        config += 'routes = ['
  
        for (const r of c.env.development.routes as any) {
          config += `\n  { pattern = "${r.pattern}"${r.zoneName ? `, zone_name = "${r.zoneName}"` : ''}${r.zoneId ? `, zone_id = "${r.zoneId}"` : ''} },`
        }
  
        config += '\n]\n'
      }
  
      if (c.env.development.kvNamespaces) {
        config += '\nkv_namespaces = [\n'
  
        for (const n of c.env.development.kvNamespaces) {
          config += `  { binding = "${n.binding}", id = "${n.id}", preview_id = "${n.previewId}" },`
        }
  
        config += '\n]\n'
      }
  
      if (c.env.development.variables) {
        config += '\n[vars]'
  
        for (const [key, value] of Object.entries(c.env.development.variables)) {
          config += `\n  ${key} = ${typeof value === 'string' ? `"${value}"` : value}`
        }
  
        config += '\n'
      }
    }
  
    if (c.migrations) {
      config += '\n\n[[migrations]]'
  
      config += `\n  tag = "${c.migrations.tag}"`
      config += `\n  new_classes = ${JSON.stringify(c.migrations.newClasses)}`
      config += '\n  renamed_classes = ['
  
      for (const r of c.migrations.renamedClasses) {
        config += `\n    { from = "${r.from}", to = "${r.to}" },`
      }
  
      config += '\n  ]'
      config += `\n  deleted_classes = ${JSON.stringify(c.migrations.deletedClasses)}`
    }
  
    if (c.site)
      config += `\n\n[site]\n  bucket = "${c.site.bucket}"\n  include = ${JSON.stringify(c.site.include)}\n  exclude = ${JSON.stringify(c.site.exclude)}\n`
  
    if (c.build)
      config += `\n\n[build]\n  command = "${c.build.command}"\n${c.build.cwd ? `  cwd = "${c.build.cwd}"\n` : ''}${c.build.watchDirectory ? `  watch_dir = "${c.build.watchDirectory}"\n` : ''}\n`
  
    if (c.rules)
      config += `\n\n[[rules]]\n  type = "${c.rules.type}"\n  globs = ${JSON.stringify(c.rules.globs)}${c.rules.fallthrough ? `\n  fallthrough = ${c.rules.fallthrough}` : ''}\n`
  
    if (c.dev) {
      config += '\n\n[dev]'
  
      if (c.dev.ip) config += `\n  ip = "${c.dev.ip}"`
      if (c.dev.port) config += `\n  port = ${c.dev.port}`
      if (c.dev.localProtocol) config += `\n  local_protocol = "${c.dev.localProtocol}"`
      
      if (c.dev.host && typeof c.dev.host === 'string')
        config += `\n  host = "${c.dev.host}"`
      else if (typeof c.dev.host === 'object')
        // @ts-ignore
        config += `\n  host = { pattern = "${c.dev.host.pattern}"${c.dev.host.zoneName ? `, zone_name = "${c.dev.host.zoneName}"` : ''}${c.dev.host.zoneId ? `, zone_id = "${c.dev.host.zoneId}"` : ''} }`
    }
  
    if (c.durableObjects) {
      config += `\n\n[durable_objects]\n  bindings = [\n`
    
      
      for (const b of c.durableObjects.bindings) {
        config += `    { name = "${b.name}", class_name = "${b.className}", script_name = "${b.scriptName}" },`
      }
      
      config += '\n  ]\n'
    }
  
    if (c.triggers)
      config += `\n\n[triggers]\n  crons = ${JSON.stringify(c.triggers.crons)}\n`
  
    if (c.env.staging) {
      config += `\n\n[env.staging]\n`
  
      if (c.env.staging.name)
        config += `  name = "${c.env.staging.name}"\n`
  
      if (c.env.staging.route && typeof c.env.staging.route === 'string')
        config += `  route = "${c.env.staging.route}"`
      else if (typeof c.env.staging.route === 'object')
        config += `  route = { pattern = "${c.env.staging.route.pattern}"${c.env.staging.route.zoneName ? `, zone_name = "${c.env.staging.route.zoneName}"` : ''}${c.env.staging.route.zoneId ? `, zone_id = "${c.env.staging.route.zoneId}"` : ''} }`
  
      if (c.env.staging.routes && typeof c.env.staging.routes[0] === 'string') {
        config += `  routes = ${JSON.stringify(c.env.staging.routes)}`
      } else if (c.env.staging.routes && typeof c.env.staging.routes[0] === 'object') {
        config += '  routes = ['
  
        for (const r of c.env.staging.routes as any) {
          config += `\n    { pattern = "${r.pattern}"${r.zoneName ? `, zone_name = "${r.zoneName}"` : ''}${r.zoneId ? `, zone_id = "${r.zoneId}"` : ''} },`
        }
  
        config += '\n  ]'
      }
  
      if (c.env.staging.kvNamespaces) {
        config += '\nkv_namespaces = [\n'
  
        for (const n of c.env.staging.kvNamespaces) {
          config += `  { binding = "${n.binding}", id = "${n.id}", preview_id = "${n.previewId}" },`
        }
  
        config += '\n  ]\n'
      }
  
      if (c.env.staging.variables) {
        config += '\n[env.staging.vars]'
  
        for (const [key, value] of Object.entries(c.env.staging.variables)) {
          config += `\n  ${key} = ${typeof value === 'string' ? `"${value}"` : value}`
        }
  
        config += '\n'
      }
    }
  
    if (c.env.production) {
      config += `\n\n[env.production]\n`
  
      if (c.env.production.name)
        config += `  name = "${c.env.production.name}"\n`
  
      if (c.env.production.route && typeof c.env.production.route === 'string')
        config += `  route = "${c.env.production.route}"\n`
      else if (typeof c.env.production.route === 'object')
        config += `  route = { pattern = "${c.env.production.route.pattern}"${c.env.production.route.zoneName ? `, zone_name = "${c.env.production.route.zoneName}"` : ''}${c.env.production.route.zoneId ? `, zone_id = "${c.env.production.route.zoneId}"` : ''} }\n`
  
      if (c.env.production.routes && typeof c.env.production.routes[0] === 'string') {
        config += `  routes = ${JSON.stringify(c.env.production.routes)}\n`
      } else if (c.env.production.routes && typeof c.env.production.routes[0] === 'object') {
        config += '  routes = ['
  
        for (const r of c.env.production.routes as any) {
          config += `\n    { pattern = "${r.pattern}"${r.zoneName ? `, zone_name = "${r.zoneName}"` : ''}${r.zoneId ? `, zone_id = "${r.zoneId}"` : ''} },`
        }
  
        config += '\n  ]\n'
      }
  
      if (c.env.production.kvNamespaces) {
        config += '\nkv_namespaces = [\n'
  
        for (const n of c.env.production.kvNamespaces) {
          config += `  { binding = "${n.binding}", id = "${n.id}", preview_id = "${n.previewId}" },`
        }
  
        config += '\n]\n'
      }
  
      if (c.env.production.variables) {
        config += '\n[env.production.vars]'
  
        for (const [key, value] of Object.entries(c.env.production.variables)) {
          config += `\n  ${key} = ${typeof value === 'string' ? `"${value}"` : value}`
        }
  
        config += '\n'
      }
    }
  
    return config
  } catch (err) {
    console.log(chalk.bold.redBright('error') + chalk.blackBright(' - cannot generate your wrangler.toml!'))
  }
}
