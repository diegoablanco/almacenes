const createService = require('feathers-sequelize');
const hooks = require('./hooks');
const config = require('config')

module.exports = function () {
  const app = this
  const { models: { stock } } = app.get('database')
  const { paginate } = config

  const options = {
    name: 'stocks',
    Model: stock,
    paginate
  };
  const servicePath = `${config.apiPath}/stocks`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath);

  service.hooks(hooks)
}
