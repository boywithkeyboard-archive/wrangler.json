import type { WranglerConfig } from '../type'

export const generateConfig = async (c: WranglerConfig) => {
  let config = ''

  config += `name = "${c.name}"`
  
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

  if (c.development) {
    if (c.development.route && typeof c.development.route === 'string')
      config += `route = "${c.development.route}"`
    else if (typeof c.development.route === 'object')
      config += `route = { pattern = "${c.development.route.pattern}"${c.development.route.zoneName ? `, zone_name = "${c.development.route.zoneName}"` : ''}${c.development.route.zoneId ? `, zone_id = "${c.development.route.zoneId}"` : ''} }`

    if (c.development.routes && typeof c.development.routes[0] === 'string') {
      config += `routes = ${JSON.stringify(c.development.routes)}`
    } else if (c.development.routes && typeof c.development.routes[0] === 'object') {
      config += 'routes = ['

      for (const r of c.development.routes as any) {
        config += `\n  { pattern = "${r.pattern}"${r.zoneName ? `, zone_name = "${r.zoneName}"` : ''}${r.zoneId ? `, zone_id = "${r.zoneId}"` : ''} },`
      }

      config += '\n]'
    }

    if (c.development.kvNamespaces) {
      config += '\nkv_namespaces = [\n'

      for (const n of c.development.kvNamespaces) {
        config += `  { binding = "${n.binding}", id = "${n.id}", preview_id = "${n.previewId}" },`
      }

      config += '\n]\n'
    }

    if (c.development.variables) {
      config += '\n[vars]'

      for (const [key, value] of Object.entries(c.development.variables)) {
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

  if (c.staging) {
    config += `\n\n[env.staging]\n`

    if (c.staging.route && typeof c.staging.route === 'string')
      config += `  route = "${c.staging.route}"`
    else if (typeof c.staging.route === 'object')
      config += `  route = { pattern = "${c.staging.route.pattern}"${c.staging.route.zoneName ? `, zone_name = "${c.staging.route.zoneName}"` : ''}${c.staging.route.zoneId ? `, zone_id = "${c.staging.route.zoneId}"` : ''} }`

    if (c.staging.routes && typeof c.staging.routes[0] === 'string') {
      config += `  routes = ${JSON.stringify(c.staging.routes)}`
    } else if (c.staging.routes && typeof c.staging.routes[0] === 'object') {
      config += '  routes = ['

      for (const r of c.staging.routes as any) {
        config += `\n    { pattern = "${r.pattern}"${r.zoneName ? `, zone_name = "${r.zoneName}"` : ''}${r.zoneId ? `, zone_id = "${r.zoneId}"` : ''} },`
      }

      config += '\n  ]'
    }

    if (c.staging.kvNamespaces) {
      config += '\nkv_namespaces = [\n'

      for (const n of c.staging.kvNamespaces) {
        config += `  { binding = "${n.binding}", id = "${n.id}", preview_id = "${n.previewId}" },`
      }

      config += '\n  ]\n'
    }

    if (c.staging.variables) {
      config += '\n[env.staging.vars]'

      for (const [key, value] of Object.entries(c.staging.variables)) {
        config += `\n  ${key} = ${typeof value === 'string' ? `"${value}"` : value}`
      }

      config += '\n'
    }
  }

  if (c.production) {
    config += `\n\n[env.production]\n`

    if (c.production.route && typeof c.production.route === 'string')
      config += `  route = "${c.production.route}"`
    else if (typeof c.production.route === 'object')
      config += `  route = { pattern = "${c.production.route.pattern}"${c.production.route.zoneName ? `, zone_name = "${c.production.route.zoneName}"` : ''}${c.production.route.zoneId ? `, zone_id = "${c.production.route.zoneId}"` : ''} }`

    if (c.production.routes && typeof c.production.routes[0] === 'string') {
      config += `  routes = ${JSON.stringify(c.production.routes)}`
    } else if (c.production.routes && typeof c.production.routes[0] === 'object') {
      config += '  routes = ['

      for (const r of c.production.routes as any) {
        config += `\n    { pattern = "${r.pattern}"${r.zoneName ? `, zone_name = "${r.zoneName}"` : ''}${r.zoneId ? `, zone_id = "${r.zoneId}"` : ''} },`
      }

      config += '\n  ]'
    }

    if (c.production.kvNamespaces) {
      config += '\nkv_namespaces = [\n'

      for (const n of c.production.kvNamespaces) {
        config += `  { binding = "${n.binding}", id = "${n.id}", preview_id = "${n.previewId}" },`
      }

      config += '\n]\n'
    }

    if (c.production.variables) {
      config += '\n[env.production.vars]'

      for (const [key, value] of Object.entries(c.production.variables)) {
        config += `\n  ${key} = ${typeof value === 'string' ? `"${value}"` : value}`
      }

      config += '\n'
    }
  }

  return config
}
