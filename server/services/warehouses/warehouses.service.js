
const createService = require('feathers-sequelize');
const createModel = require('../../models/warehouses.model');
const hooks = require('./warehouses.hooks');
const filters = require('./warehouses.filters');
const config = require('config')

module.exports = function () {
  const app = this;
  const Model = createModel(app.get('database'));
  const paginate = config.paginate

  const options = {
    name: 'warehouses',
    Model,
    paginate
  };
  const servicePath = `${config.apiPath}/warehouses`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath);

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
