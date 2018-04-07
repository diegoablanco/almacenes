const getDatabase = require('../../../server/database')
const getStockIncludes = require('../stock/helpers/getIncludes')
const getIssueIncludes = require('./includes')

async function setStatusByCode(stock, code, transaction) {
  if (code === 'edit') return
  const { models: { stockStatus } } = getDatabase()
  const status = await stockStatus.find({ where: { code } })
  await stock.setStatus(status.id, { transaction })
}
async function reduceUnitsBy(stock, quantity, transaction) {
  stock.quantity -= quantity
  if (stock.quantity === 0) await setStatusByCode(stock, 'fulfilled', transaction)
}
module.exports = {
  setStatusByCode,
  reduceUnitsBy,
  async reduceUnitsTotally(stock, transaction) {
    reduceUnitsBy(stock, stock.quantity, transaction)
  },
  async releaseToCustomer({ stock: { id: stockId }, customerId, quantity, onHold = false, transaction }) {
    const database = getDatabase()
    const { models: { stock: stocks } } = database
    const {
      warehouseInstruction,
      stockBox,
      stockPallets,
      documents,
      images
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
      customerId: originalCustomerId,
      statusId,
      targetCustomerId,
      instructions,
      quantity: originalQuantity,
      images: originalImages,
      documents: originalDocuments,
      ...originalStock
    } = sourceStock.get({ plain: true })
    const newStock = await stocks.create({ ...originalStock, customerId, parentId, quantity: quantity || originalQuantity }, { transaction })
    await newStock.setInstructions((instructions || []).map(x => x.id), { transaction })
    
    await setStatusByCode(newStock, onHold ? 'onHold' : 'released', transaction)
  },
  async issue({ stock, date, carrierId, address, documents = [], images = [], transaction }) {
    const { models: { address: addresses } } = getDatabase()
    const includes = getIssueIncludes(getDatabase())
    let addressId
    if (address) {
      const newAddress = await addresses.create(address)
      addressId = newAddress.id
    }
    await stock.createIssue({ date, carrierId, documents, images, addressId }, { include: [
      includes.documents,
      includes.images
    ],
    transaction,
    raw: false })
  }
}
