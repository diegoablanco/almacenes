
const createService = require('feathers-sequelize')
const hooks = require('./hooks')
const { paginate, apiPath } = require('config')

module.exports = function () {
  const app = this
  const { models: { productCategory: Model } } = app.get('database')

  const options = {
    name: 'productCategories',
    Model,
    paginate
  }
  const servicePath = `${apiPath}/productCategories`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath)

  service.hooks(hooks)
}
