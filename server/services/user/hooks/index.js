const hooks = require('feathers-hooks-common');
const { callbackToPromise, validate } = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
const local = require('feathers-authentication-local');
const { restrictToOwner } = require('feathers-authentication-hooks');
const populate = require('feathers-populate-hook');
const verifyHooks = require('feathers-authentication-management').hooks;
const validateSchema = require('feathers-hooks-validate-joi');
const config = require('config');
const debugHook = require('../../hooks/debugHook')

const emailer = require('../../../helpers/emails');
const client = require('../../../../common/helpers/usersClientValidations');
const schemas = require('../../../validations/schemas');
const server = require('../../../validations/usersServerValidations');
const notifier = require('../../authentication/notifier')

const idName = config.database.idName;
const app = this;

exports.before = (app) => {
  const users = app.service(`${config.apiPath}/users`); // eslint-disable-line no-unused-vars

  return {

    all: debugHook(),
    find: [
      auth.authenticate(['jwt', 'local']),
      function (hook) {
        hook.params.query.$sort = hook.params.query.$sort || { createdAt: -1 }
      }
    ],
    get: [
      auth.authenticate(['jwt', 'local']),
      restrictToOwner({ ownerField: idName })
    ],
    create: [
      // validateSchema.form(schemas.signup, schemas.options), // schema validation
      validate(client.signup), // redo redux-form client validation
      hooks.validate(values =>
        app.service(`${config.apiPath}/authManagement`).create({
          action: 'checkUnique',
          value: { username: values.username, email: values.email }
        })),
      hooks.validate(callbackToPromise(server.signup, { app })), // server validation
      hooks.remove('confirmPassword'),
      verifyHooks.addVerification(`${config.apiPath}/authManagement`), // set email addr verification info
      local.hooks.hashPassword()
    ],
    update: [
      auth.authenticate(['jwt', 'local']),
      restrictToOwner({ ownerField: idName })
    ],
    patch: [ // client route /user/rolechange patches roles. todo might check its an admin acct
      auth.authenticate(['jwt', 'local'])
    ],
    remove: [
      auth.authenticate(['jwt', 'local']),
      restrictToOwner({ ownerField: idName })
    ]
  };
};

exports.after = (app) => ({
  all: debugHook(),
  find: [
    hooks.remove('password'),
    verifyHooks.removeVerification()
  ],
  get: [
    hooks.remove('password'),
    verifyHooks.removeVerification()
  ],
  create: [
    hooks.remove('password'),
    sendVerificationEmail(), // send email to verify the email addr
    verifyHooks.removeVerification()
  ],
  update: [
    hooks.remove('password'),
    verifyHooks.removeVerification()
  ],
  patch: [
    hooks.remove('password'),
    verifyHooks.removeVerification()
  ],
  remove: [
    hooks.remove('password'),
    verifyHooks.removeVerification()
  ]
})

function emailVerification(hook, next) {
  const user = clone(hook.result);
  const params = hook.params;

  emailer('send', user, params, (err) => {
    next(err, hook);
  });
}

const sendVerificationEmail = options => hook => {
  if (!hook.params.provider) { return hook; }
  const user = hook.result
  if (hook.data && hook.data.email && user) {
    notifier(hook.app)('resendVerifySignup', user)
    return hook
  }
  return hook
}
// Helpers

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
