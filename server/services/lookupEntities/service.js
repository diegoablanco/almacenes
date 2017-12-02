const hooks = require('./hooks')
const config = require('config')
const getDatabase = require('../../../server/database')

module.exports = function () {
  const app = this

  const servicePath = `${config.apiPath}/lookupEntities`
  // Initialize our service with any options it requires
  app.use(servicePath, {
    find(params) {
      const { models } = getDatabase()
      const { query } = params
      let model = {}
      let attributes

      switch (query.entity) {
        case 'customer':
          model = models.customer
          attributes = ['id', ['companyName', 'description']]
          break
        case 'carrier':
          model = models.carrier
          attributes = ['id', ['companyName', 'description']]
          break
        default:
          return ''
      }
      delete query.entity
      return model.findAll({ where: query, attributes })
    }
  })

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath)

  service.hooks(hooks)
}
