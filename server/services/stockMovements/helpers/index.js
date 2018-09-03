const issue = require('./issue')
const reduceUnitsByReferences = require('./reduceUnitsByReferences')
const reduceUnitsTotally = require('./reduceUnitsTotally')
const releaseToCustomer = require('./releaseToCustomer')
const setStatusByCode = require('./setStatusByCode')
const createDerivedStock = require('./createDerivedStock')

module.exports = {
  issue,
  reduceUnitsByReferences,
  reduceUnitsTotally,
  releaseToCustomer,
  setStatusByCode,
  createDerivedStock
}

