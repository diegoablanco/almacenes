const hooks = require('./hooks')
const config = require('config')
const getDatabase = require('../../../server/database')

module.exports = function () {
  const app = this

  const servicePath = `${config.apiPath}/lookupEntities`
  
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
        case 'warehouse':
          model = models.warehouse
          attributes = ['id', ['name', 'description']]
          break
        case 'productCategory':
          model = models.productCategory
          attributes = ['id', 'description']
          break
        default:
          return ''
      }
      delete query.entity
      return model.findAll({ where: query, attributes })
    }
  })

  const service = app.service(servicePath)
  service.hooks(hooks)
}
