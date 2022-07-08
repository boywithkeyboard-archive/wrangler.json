import { defineConfig } from '../src'

export default defineConfig({
  accountId: '0123456789',
  
  compatibilityFlags: [
    'flag one',
    'flag two'
  ],

  development: {
    name: 'my awesome worker'
  }
})
