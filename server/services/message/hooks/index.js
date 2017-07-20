
const auth = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;

exports.before = {
  all: [
    auth.authenticate['jwt', 'local'],
    verifyHooks.isVerified(),
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};
