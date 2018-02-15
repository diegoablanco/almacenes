const { setStatusByCode } = require('../stockMovements/helper')

module.exports = async function ({ result, data: { movementType, onHold } }) {
  if (movementType === 'receive' && onHold) setStatusByCode(result, 'onHold')
  else setStatusByCode(result, movementType)
}
