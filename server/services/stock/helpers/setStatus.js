const { setStatusByCode } = require('../../stockMovements/helpers')

module.exports = async function ({ result, data: { movementType, onHold } }) {
  const statusCode = movementType === 'receive' && onHold ? 'onHold' : movementType
  await setStatusByCode(result, statusCode)
}
