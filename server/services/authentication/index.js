const debug = require('debug')('service:feathers-authentication')
const authentication = require('feathers-authentication')
const jwt = require('feathers-authentication-jwt')
const local = require('feathers-authentication-local')
const config = require('config')
const debugHook = require('../hooks/debugHook')
const authManagement = require('feathers-authentication-management')
const notifier = require('./notifier')

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  debug('Config');
  const app = this;
  const authConfig = config.auth;

  app.configure(authentication(authConfig))
    .configure(jwt())
    .configure(local(authConfig.local))
    .configure(authManagement({
      path: `${config.apiPath}/authManagement`,
      service: `${config.apiPath}/users`,
      notifier: notifier(app)
    }))

  app.service(`${config.apiPath}/auth/local`).hooks({
    before: {
      all: debugHook(),
      create: [
        authentication.hooks.authenticate(authConfig.strategies)
      ]
    },
    after: {
      all: debugHook(),
      create: [
        hook => {
          hook.result.token = hook.result.accessToken
          delete hook.result.accessToken
          hook.result.data = hook.params.user
          delete hook.result.data.password
        }
      ]
    }
  })

  app.service(`${config.apiPath}/authManagement`).hooks({
    after: {
      all: debugHook('========================= authManagement =============================')
    }
  })

  debug('Config complete');
};
