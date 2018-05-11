const config = require('config')
const { BadRequest } = require('feathers-errors');
const path = require('path')
const fs = require('fs')
const hooks = require('./hooks')


const servicePath = `${config.apiPath}/download`
module.exports = function () {
  const app = this
  app.use(
    servicePath,
    {
      async get(hashName) {
        const { uploads: { path: uploadsPath } } = config
        try {
          return path.join(uploadsPath, hashName)
        } catch (error) {
          throw new BadRequest({ errors: error.message })
        }
      }
    },
    async (req, res) => {
      const file = await fs.readFileSync(res.data, 'binary')
      res.type('pdf')
      res.setHeader('Content-Length', file.length)
      res.setHeader('fileName', 'asdfasdf')
      res.write(file, 'binary')
      res.send()
    }
  )

  const service = app.service(servicePath)

  service.hooks(hooks)
}
