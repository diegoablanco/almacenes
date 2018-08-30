const getDatabase = require('../../../../server/database')
const getStockIncludes = require('../../stock/helpers/getIncludes')
const setStatusByCode = require('./setStatusByCode')

module.exports = async ({
  stock: { id: stockId },
  customerId,
  onHold = false,
  referencesToRelease,
  transaction
}) => {
  const database = getDatabase()
  const { models: { stock: stocks } } = database
  const {
    warehouseInstruction,
    stockBox,
    stockPallets,
    documents,
    images,
    references
  } = getStockIncludes(database)
  const sourceStock = await stocks.findById(stockId, {
    include: [
      warehouseInstruction,
      stockBox,
      stockPallets,
      documents,
      references,
      images]
  })
  const {
    id: parentId,
    boxesId,
    paletsId,
    boxes,
    palets,
    createdAt,
    updatedAt,
    customerId: originalCustomerId,
    statusId,
    targetCustomerId,
    instructions,
    quantity: originalQuantity,
    images: originalImages,
    documents: originalDocuments,
    references: originalReferences,
    ...originalStock
  } = sourceStock.get({ plain: true })
  const newStock = await stocks.create({
    ...originalStock,
    customerId,
    parentId,
    references: referencesToRelease.map(({ reference, quantity }) => ({ reference, quantity }))
  }, { transaction, include: [references] })
  await newStock.setInstructions((instructions || []).map(x => x.id), { transaction })

  await setStatusByCode(newStock, onHold ? 'onHold' : 'released', transaction)
}
