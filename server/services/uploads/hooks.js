const auth = require('feathers-authentication').hooks
const dauria = require('dauria')
const { thumb } = require('node-thumbnail')
const config = require('config')
const path = require('path')
const { getBase64String } = require('./helpers')

const { uploads: { path: uploadsPath } } = config

module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
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
      },
      function (context) {
        delete context.result.uri
        const { result: { id: filename } } = context

        if (filename.match(/.(jpg|png|jpeg)+$/gi)) {
          thumb({
            width: 300,
            source: path.join(uploadsPath, filename),
            destination: uploadsPath })
        }
        return context
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
