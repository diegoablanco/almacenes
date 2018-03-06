const hooks = require('feathers-hooks-common')
const { callbackToPromise, validate } = require('feathers-hooks-common')
const auth = require('feathers-authentication').hooks
const local = require('feathers-authentication-local')
const { restrictToOwner } = require('feathers-authentication-hooks')
const verifyHooks = require('feathers-authentication-management').hooks
const config = require('config')
const debugHook = require('../../hooks/debugHook')
const hydrate = require('feathers-sequelize/hooks/hydrate')
const dehydrate = require('feathers-sequelize/hooks/dehydrate')

const client = require('../../../../common/helpers/usersClientValidations')
const notifier = require('../../authentication/notifier')

const { database: { idName } } = config
const app = this;

// Helpers

const sendVerificationEmail = () => hook => {
  if (!hook.params.provider) { return hook; }
  const user = hook.result
  if (hook.data && hook.data.email && user) {
    notifier(hook.app)('resendVerifySignup', user)
    return hook
  }
  return hook
}
function setRoles(hook) {
  const { result, data: { roles = [] } } = hook
  result.setRoles(roles.map(x => x.id))
}
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
    hydrate(),
    setRoles,
    dehydrate(),
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

