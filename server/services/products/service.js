
const createService = require('feathers-sequelize')
const hooks = require('./hooks')
const config = require('config')

module.exports = function () {
  const app = this
  const { models: { product: Model } } = app.get('database')

  const options = {
    name: 'products',
    Model
  };
  const servicePath = `${config.apiPath}/products`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath)

  service.hooks(hooks)
}
