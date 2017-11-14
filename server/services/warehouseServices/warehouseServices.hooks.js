const auth = require('feathers-authentication').hooks;
const Ajv = require('ajv')
const { setNow } = require('feathers-hooks-common')
const errorReducer = require('../../helpers/errorReducer')
const hydrate = require('feathers-sequelize/hooks/hydrate')

function addIncludes(hook){
  const {
    models: {
      service
    }
  } = hook.app.get('database')
  hook.params.sequelize = hook.params.sequelize || {}
  hook.params.sequelize = {
    include: [service]
  }
}
module.exports = {
  before: {
    all: [
    ],
    find: [
      addIncludes
    ],
    get: [],
    create: [      
      setNow('createdAt')
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [function(hook){
      const {
        models: { service }
      } = hook.app.get('database')
      const association = { include: [{model: service}] }
      hydrate( association ).call(this, hook)
    }],
    patch: [addIncludes],
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
