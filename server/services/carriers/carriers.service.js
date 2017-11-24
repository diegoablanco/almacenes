const createService = require('feathers-sequelize');
const hooks = require('./carriers.hooks');
const config = require('config')

module.exports = function () {
  const app = this
  const Model = app.get('database').models['carrier']
  const paginate = config.paginate

  const options = {
    name: 'carrier',
    Model,
    paginate
  };
  const servicePath = `${config.apiPath}/carriers`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath);

  service.hooks(hooks)
}
