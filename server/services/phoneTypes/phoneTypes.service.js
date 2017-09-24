
const createService = require('feathers-sequelize')
const createModel = require('../../models/phoneType')
const hooks = require('./phoneTypes.hooks')
const filters = require('./phoneTypes.filters')
const config = require('config')

module.exports = function () {
  const app = this;
  const Model = createModel(app.get('database'))

  const options = {
    name: 'phoneTypes',
    Model
  };
  const servicePath = `${config.apiPath}/phoneTypes`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath)

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
};
