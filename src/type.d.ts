export type WranglerEnv = {
  route?:
    | string
    | {
        pattern: string
        zoneName?: string
        zoneId?: string
      }

  kvNamespaces?: {
    binding: string
    id: string
    previewId: string
  }[],

  routes?:
    | string[]
    | {
        pattern: string
        zoneName?: string
        zoneId?: string
      }[]

  variables?: { [key: string]: any } // vars
}

export type WranglerConfig = {
  name: string
  accountId: string
  workersDev?: boolean

  main?: string

  usageModel?: 'bundled' | 'unbound'

  compatibilityDate?: string

  compatibilityFlags?: string[]

  triggers?: {
    crons: string[]
  }

  durableObjects?: {
    bindings: {
      name: string,
      className: string,
      scriptName: string
    }[]
  }

  migrations?: {
    tag: string
    newClasses: string[]
    renamedClasses: {
      from: string
      to: string
    }[]
    deletedClasses: string[]
  }

  r2Buckets?: {
    binding: string
    bucketName: string
    previewBucketName: string
  }[]

  site?: {
    bucket: string
    include: string[]
    exclude: string[]
  }

  development?: WranglerEnv
  staging?: WranglerEnv
  production?: WranglerEnv

  build?: {
    command: string
    cwd?: string
    watchDirectory?: string
  }

  rules?: {
    type: 'Text' | 'Data' | 'CompiledWasm'
    globs: string[]
    fallthrough?: boolean
  }

  tsconfig?: string

  minify?: boolean

  nodeCompatibility?: boolean

  dev?: {
    ip?: string
    port?: number
    localProtocol?: 'http' | 'https'
    host?:
      | string
      | {
          pattern: string
          zoneName?: string
          zoneId?: string
        }
  }

  services?: {
    binding: string
    service: string
    environment: string
  }[]
}
