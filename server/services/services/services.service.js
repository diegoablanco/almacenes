
const createService = require('feathers-sequelize')
const createModel = require('../../models/service')
const hooks = require('./services.hooks')
const filters = require('./services.filters')
const config = require('config')

module.exports = function () {
  const app = this;
  const Model = createModel(app.get('database'))

  const options = {
    name: 'services',
    Model,
    paginate: config.paginate
  };
  const servicePath = `${config.apiPath}/services`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath)

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
};
