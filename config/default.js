
/* eslint no-useless-escape: 0, quotes: 0 */

const path = require('path');
const defer = require('config/defer').deferConfig;

const sec = 1000;
const min = sec * 60;
const hr = min * 60;
const root = process.cwd();

// 'defer' defers calc until the final merged configuration structure has been built

module.exports = {
  isProduction: defer(finalConfig => finalConfig.NODE_ENV === 'production'),
  // devserver, development or production. validated on server start up
  NODE_ENV: undefined,
  // npm debug
  DEBUG: undefined,
  appPath: '/',
  server: {
    // host name e.g. localhost
    host: undefined,
    // root folder with assets. Webpack bundles are written to ./dist
    publicPath: path.join(root, 'public'), // also some hard coding in server/app, webpack
    serverPath: path.join(root, 'server'), // also some hard coding in server/app, webpack
    protocal: "http"
  },
  logs: {
    // log level for the file. from highest: 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
    logLevel: undefined,
    // folder where logs are saved
    path: undefined,
    // log file names
    fileName: 'server.log',
    // log level for the console
    logConsoleLevel: undefined
  },
  // unused so far
  auth: {
    secret: undefined,
    local: {},
    users: 'api/users'
  },
  client: {
    // Name of app
    appName: 'Xarxa Almacenes',
    // Route for app's root.
    // Used by Express middleware, React-Router config, and app when redirecting.
    defaultRoute: '/customers'
  },
  database: {
    // folder for NeDn database
    path: undefined,
    // Some DBs, like PostgreSQL, use 'id' prop for their record keys instead of '_id'.
    // The code sometimes cannot avoid having to use the prop name, e.g. with hook.restrictToOwner.
    idName: '_id'
  },
  users: {
    roles: {
      // the first user added to an empty users file is made an administrator using these roles.
      forFirstUser: 'superAdmin admin',
      // the default roles for a new user
      default: '',
      // roles allowed to change the roles of other users
      allowedToChangeRoles: ['superAdmin', 'admin']
    }
  },
  paginate: {
    default: 10,
    max: 100
  },
  // for transactional emails sent. here for convenience.
  authEmails: {
    expires: {
      // duration of sign  up tokens.
      signUpEmailTokenTimeValid: 24 * hr,
      signUpEmailTokenTimeValidText: '24 hours',
      // duration of forgotten password tokens
      forgotPasswordEmailTokenTimeValid: 30 * min,
      forgotPasswordEmailTokenTimeValidText: '30 minutes'
    },
    subs: {
      // text to include in emails and the sign up verification screen
      productName: '[feathers-starter-react-redux-login-roles]',
      productUrl: '[http://feathers-starter.feathersjs.com]',
      senderName: '[Feathers Starter]',
      fromEmail: '[Feathers Starter <feathers-starter@gmail00.com>]',
      supportEmail: '[Starter Support <feathers-starter@gmail00.com>]',
      copyrightYears: '2015-2016'
    },
    // not used in boilerplate
    providers: {
      postmark: {
        fromEmail: undefined,
        postmarkApiToken: undefined
      }
    }
  },
  // for user screens. here for convenience.
  validation: { // you need to make Joi changes in server/validations/schemas also.
    auth: {
      name: {
        re: "^[\\sa-zA-Z]{5,30}$", // regex cannot be encoded in JSON
        err: 'El nombre debe tener entre 5 y 30 caracteres.'
      },
      username: {
        re: "^[a-zA-Z0-9]{5,30}$",
        err: 'El nombre de usuario debe tener entre 5 y 30 caracteres.'
      },
      password: {
        re: "^[\\sa-zA-Z0-9]{8,30}$",
        err: 'Debe tener entre 8 y 30 caracteres.'
      },
      email: {
        // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        re: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", // eslint-disable-line max-len
        err: 'Email inválido.',
        minLen: 8,
        maxLen: 30,
        errLen: 'Debe tener entre 8 y 30 caracteres.'
      }
    }
  },
  // client itself sets these on start up
  agent: {
    clientBuiltFor: null,
    deviceId: null
  },

  // This is the subset of the config sent to the client
  clientConfig: defer(finalConfig => ({
    client: {
      appName: finalConfig.client.appName,
      defaultRoute: finalConfig.client.defaultRoute
    },
    users: {
      roles: {
        allowedToChangeRoles: finalConfig.users.roles.allowedToChangeRoles
      }
    },
    authEmails: {
      expires: {
        signUpEmailTokenTimeValidText: finalConfig.authEmails.expires.signUpEmailTokenTimeValidText,
        forgotPasswordEmailTokenTimeValidText:
        finalConfig.authEmails.expires.forgotPasswordEmailTokenTimeValidText
      },
      subs: {
        productName: finalConfig.authEmails.subs.productName,
        productUrl: finalConfig.authEmails.subs.productUrl,
        senderName: finalConfig.authEmails.subs.senderName,
        fromEmail: finalConfig.authEmails.subs.fromEmail,
        supportEmail: finalConfig.authEmails.subs.supportEmail,
        copyrightYears: finalConfig.authEmails.subs.copyrightYears
      }
    },
    validation: {
      auth: {
        name: {
          re: finalConfig.validation.auth.name.re,
          err: finalConfig.validation.auth.name.err
        },
        username: {
          re: finalConfig.validation.auth.username.re,
          err: finalConfig.validation.auth.username.err
        },
        password: {
          re: finalConfig.validation.auth.password.re,
          err: finalConfig.validation.auth.password.err
        },
        email: {
          re: finalConfig.validation.auth.email.re,
          err: finalConfig.validation.auth.email.err,
          minLen: finalConfig.validation.auth.email.minLen,
          maxLen: finalConfig.validation.auth.email.maxLen,
          errLen: finalConfig.validation.auth.email.errLen
        }
      }
    },
    agent: {
      clientBuiltFor: finalConfig.agent.clientBuiltFor,
      deviceId: finalConfig.agent.deviceId
    }
  }))
};
