const { join } = require('path')
const { parseConfig } = require('../dist/index.js')

const run = async () => {
  console.log(await parseConfig(join(__dirname, './custom.ts')))
}

run()
