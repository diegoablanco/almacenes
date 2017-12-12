const auth = require('feathers-authentication').hooks
const dauria = require('dauria')

module.exports = {
  before: {
    all: [
      //auth.authenticate(['jwt', 'local'])
    ],
    find: [],
    get: [],
    create: [
      function (hook) {
        const { params: { file } } = hook
        if (!hook.data.uri && file) {
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = { uri };
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function (context) {
        delete context.result.uri
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
