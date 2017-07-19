const debug = require('debug')('service:feathers-authentication');
const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const authConfig = require('config').auth;
const debugHook = require('../hooks/debugHook')

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  debug('Config');
  const app = this;

  app.configure(authentication(authConfig));
  app.configure(jwt());
  app.configure(local(authConfig.local));
  app.service('auth/local').hooks({
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
  debug('Config complete');
};