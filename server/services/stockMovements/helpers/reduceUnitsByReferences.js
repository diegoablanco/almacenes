const { sumBy } = require('lodash')
const setStatusByCode = require('./setStatusByCode')

module.exports = async (stock, references, transaction) => {
  await Promise.all(references.map(async ({ id, quantity }) => {
    const stockReference = stock.references.find(reference => reference.id === id)
    stockReference.quantity -= quantity
    await stockReference.save({ transaction })
  }));
  if (sumBy(stock.references, ref => ref.quantity) === 0) {
    await setStatusByCode(stock, 'fulfilled', transaction)
  }
}
