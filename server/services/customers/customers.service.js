// Initializes the `customers` service on path `/customers`
const createService = require('feathers-nedb');
const createModel = require('../../models/customers.model');
const hooks = require('./customers.hooks');
const filters = require('./customers.filters');
const config = require('config')

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'customers',
    Model,
    paginate
  };
  const servicePath = `${config.apiPath}/customers`
  // Initialize our service with any options it requires
  app.use(servicePath, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(servicePath);

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
