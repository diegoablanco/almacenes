const createService = require('feathers-sequelize')
const config = require('config')

const debug = require('debug')('service:user')
const hooks = require('./hooks')
const createModel = require('../../models/user')

module.exports = function () { // 'function' needed as we use 'this'
  const app = this
  
  const Model = createModel(app.get('database'))
  const options = {
    name: 'users',
    Model,
    paginate: config.paginate
  }

  // Initialize our service with any options it requires
  const servicePath = `${config.apiPath}/users`
  app.use(servicePath, createService(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service(servicePath);

  // Set up our before hooks
  userService.before(hooks.before(app));

  // Set up our after hooks
  userService.after(hooks.after(app));

}
