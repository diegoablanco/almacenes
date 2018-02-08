const { last } = require('lodash')

module.exports = async function ({ result, data: { movementTypeId } }) {
  // const movements = await result.getMovements()
  result.setStatus(movementTypeId)
}
