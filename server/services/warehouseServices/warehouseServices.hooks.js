const { setNow } = require('feathers-hooks-common')
const hydrate = require('feathers-sequelize/hooks/hydrate')
const { processSort } = require('../helpers')

function addIncludes(hook) {
  const {
    models: {
      service,
      stockMovementType
    }
  } = hook.app.get('database')
  hook.params.sequelize = hook.params.sequelize || {}
  hook.params.sequelize = {
    include: [service, stockMovementType]
  }
}
module.exports = {
  before: {
    all: [
    ],
    find: [
      addIncludes,
      processSort
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
    update: [function (hook) {
      const {
        models: { service }
      } = hook.app.get('database')
      const association = { include: [{ model: service }] }
      hydrate(association).call(this, hook)
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
