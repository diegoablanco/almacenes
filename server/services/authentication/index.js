const debug = require('debug')('service:feathers-authentication')
const authentication = require('feathers-authentication')
const jwt = require('feathers-authentication-jwt')
const local = require('feathers-authentication-local')
const config = require('config')
const { remove } = require('feathers-hooks-common')
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
        async hook => {
          const { models: { user: userModel, role } } = hook.app.get('database')
          const { result, params: { user: { password, ...paramUser } } } = hook
          const u = await userModel.findById(paramUser.id, { include: [{ model: role, through: 'user_roles' }] })

          result.token = hook.result.accessToken
          result.data = { ...paramUser, roles: u.roles.map(x => x.code) }
        },
        remove('accessToken')
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
