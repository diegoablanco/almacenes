const createService = require('feathers-sequelize')
const hooks = require('./hooks')
const config = require('config')

module.exports = function () {
  const app = this
  const { models: { stockAccountMovement: Model } } = app.get('database')

  const options = {
    name: 'stockAccountMovements',
    Model,
    paginate: config.paginate
  };
  const servicePath = `${config.apiPath}/stockAccountMovements`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath)

  service.hooks(hooks)
};
