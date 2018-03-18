const getDatabase = require('../../../server/database')
const getStockIncludes = require('../stock/helpers/getIncludes')
const getIssueIncludes = require('./includes')

async function setStatusByCode(stock, code, transaction) {
  const { models: { stockStatus } } = getDatabase()
  const status = await stockStatus.find({ where: { code } })
  stock.setStatus(status.id)
  await stock.save({ transaction })
}
module.exports = {
  setStatusByCode,
  async reduceGoodsBy(stock, quantity, transaction) {
    const goods = stock.boxes || stock.palets
    goods.quantity -= quantity
    if (quantity === 0) await setStatusByCode(stock, 'fulfilled')
    await goods.save({ transaction })
  },
  async reduceGoodsTotally(stock, transaction) {
    const goods = stock.boxes || stock.palets
    goods.quantity = 0
    await setStatusByCode(stock, 'fulfilled', transaction)
    await goods.save({ transaction })
  },
  async releaseToCustomer({ stock: { id: stockId }, customerId, quantity, onHold = false, transaction }) {
    const { models: { stock: stocks } } = getDatabase()
    const {
      warehouseInstruction,
      stockBox,
      stockPallets,
      documents,
      images
    } = getStockIncludes(getDatabase())
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
      onHold: originalOnHold,
      statusId,
      targetCustomerId,
      instructions,
      images: originalImages,
      documents: originalDocuments,
      ...originalStock
    } = sourceStock.get({ plain: true })
    const newStock = await stocks.create({ ...originalStock, customerId, parentId }, { transaction })
    await newStock.setInstructions((instructions || []).map(x => x.id))
    if (quantity) (boxes || palets).quantity = quantity
    if (boxes) {
      const { id: originalBoxesId, ...newBoxes } = boxes
      await newStock.createBoxes(newBoxes, { transaction })
    }
    if (palets) {
      const { id: originalPaletsId, ...newPalets } = palets
      await newStock.createPalets(newPalets, { transaction })
    }
    await setStatusByCode(newStock, onHold ? 'onHold' : 'released')
  },
  async issue({ stock, date, carrierId, address, documents, images, transaction }) {
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
    // return
    // const stockIssue = await stockIssues.create({ date, carrierId, documents, images }, { include: [
    //   includes.documents,
    //   includes.images,
    //   includes.address
    // ] })
    // if (address) {
    //   await stockIssue.createAddress(address)
    // }
    // stock.setIssue(stockIssue)
  }
}
