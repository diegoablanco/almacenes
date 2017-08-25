
/* eslint no-console: 0, no-param-reassign: 0 */

const debug = require('debug')('service:index');
const config = require('config');
const auth = require('feathers-authentication').hooks;

const authentication = require('./authentication');
const user = require('./user');
const message = require('./message');
const customers = require('./customers/customers.service.js');

const tryHook = require('./hooks/tryHook');
const logger = require('../utils/loggerProduction');

debug('Required');

module.exports = function () {
  debug('Config');
  const app = this;

  app.configure(authentication);
  app.configure(user);
  app.configure(message);
  app.configure(customers);

  // get client config file
  app.use(`${config.apiPath}/config`, {
    get() {
      return Promise.resolve(config.clientConfig);
    },
  });

  // create log entry
  app.use(`${config.apiPath}/logs`, {
    before: {
      create: [
        tryHook(auth.authenticate['jwt', 'local']),
      ],
    },
    create({ level, msg, payload }, params) {
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
    },
  });

  debug('Config complete');
};
