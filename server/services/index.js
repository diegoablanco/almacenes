const debug = require('debug')('service:index')
const config = require('config')
const authentication = require('./authentication')
const user = require('./user')
const messages = require('./messages')
const customers = require('./customers/customers.service.js')
const warehouses = require('./warehouses/warehouses.service.js')
const warehouseServices = require('./warehouseServices/warehouseServices.service.js')
const services = require('./services/services.service.js')
const uneditables = require('./uneditables/uneditables.service')
const carriers = require('./carriers/carriers.service')
const stock = require('./stock/service')
const lookupEntities = require('./lookupEntities/service')
const logger = require('../utils/loggerProduction')
const upload = require('./uploads/service')
const stockMovements = require('./stockMovements/service')
const download = require('./download/service')
const productTypes = require('./productTypes/service')
const products = require('./products/service')
const productCategories = require('./productCategories/service')
const stockAccountMovements = require('./stockAccountMovements/service')
const reports = require('./reports/service')

debug('Required')

module.exports = function () {
  debug('Config')
  const app = this

  app.configure(authentication)
  app.configure(upload)
  app.configure(user)
  app.configure(messages)
  app.configure(customers)
  app.configure(warehouses)
  app.configure(warehouseServices)
  app.configure(services)
  app.configure(uneditables)
  app.configure(carriers)
  app.configure(stock)
  app.configure(lookupEntities)
  app.configure(stockMovements)
  app.configure(download)
  app.configure(productTypes)
  app.configure(products)
  app.configure(productCategories)
  app.configure(stockAccountMovements)
  app.configure(reports)

  // get client config file
  app.use(`${config.apiPath}/config`, {
    get() {
      return Promise.resolve(config.clientConfig);
    }
  })

  // create log entry
  app.use(`${config.apiPath}/logs`, {
    before: {
    },
    create({ level, msg, payload = {} }, params) {
      const paramsUser = params.user;

      if (paramsUser && (paramsUser.email || paramsUser.username)) {
        payload.user = payload.user || {};

        if (paramsUser.email) {
          payload.user.email = paramsUser.email;
        }
        if (paramsUser.username) {
          payload.user.username = paramsUser.username;
        }
      }

      if (!payload.tags) {
        payload.tags = 'client';
      }

      logger[level](msg, payload);

      // Note: Redux's action.payload will contain undefined instead of null
      return Promise.resolve(null);
    }
  });
  debug('Config complete');
};
