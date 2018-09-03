const setStatusByCode = require('./setStatusByCode')
const createDerivedStock = require('./createDerivedStock')

module.exports = async ({
  stock: { id: stockId },
  customerId,
  onHold = false,
  referencesToRelease,
  transaction
}) => {
  const newStock = await createDerivedStock({
    stockId,
    customerId,
    references: referencesToRelease,
    transaction
  })
  await setStatusByCode(newStock, onHold ? 'onHold' : 'released', transaction)
}
