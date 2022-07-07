import { defineConfig } from '../src'

export default defineConfig({
  name: 'my awesome worker',
  accountId: '0123456789',
  
  compatibilityFlags: [
    'flag one',
    'flag two'
  ]
})
