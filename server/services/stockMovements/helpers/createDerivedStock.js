const getDatabase = require('../../../../server/database')
const getStockIncludes = require('../../stock/helpers/getIncludes')

module.exports = async ({
  stockId,
  customerId,
  references: referencesToDerive,
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
    customerId: customerId || originalStock.customerId,
    parentId,
    references: referencesToDerive.map(({ reference, quantity }) => ({ reference, quantity }))
  }, { transaction, include: [references] })

  return newStock
}
