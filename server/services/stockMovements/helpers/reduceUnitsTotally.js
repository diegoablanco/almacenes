const reduceUnitsByReferences = require('./reduceUnitsByReferences')

module.exports = async (stock, transaction) => {
  await reduceUnitsByReferences(stock, stock.references, transaction)
}
