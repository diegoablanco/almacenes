const getDatabase = require('../../../server/database')
const getStockIncludes = require('../stock/helpers/getIncludes')
const getIssueIncludes = require('./includes')

async function setStatusByCode(stock, code) {
  const { models: { stockStatus } } = getDatabase()
  const status = await stockStatus.find({ where: { code } })
  stock.setStatus(status.id)
  await stock.save()
}
module.exports = {
  setStatusByCode,
  async reduceGoodsBy(stock, quantity) {
    const goods = stock.boxes || stock.palets
    goods.quantity -= quantity
    if (quantity === 0) await setStatusByCode(stock, 'fulfilled')
    await goods.save()
  },
  async reduceGoodsTotally(stock) {
    const goods = stock.boxes || stock.palets
    goods.quantity = 0
    await setStatusByCode(stock, 'fulfilled')
    await goods.save()
  },
  async releaseToCustomer({ stock: { id: stockId }, customerId, quantity, onHold = false }) {
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
    const newStock = await stocks.create({ ...originalStock, customerId, parentId })
    await newStock.setInstructions((instructions || []).map(x => x.id))
    if (quantity) (boxes || palets).quantity = quantity
    if (boxes) {
      const { id: originalBoxesId, ...newBoxes } = boxes
      await newStock.createBoxes(newBoxes)
    }
    if (palets) {
      const { id: originalPaletsId, ...newPalets } = palets
      await newStock.createPalets(newPalets)
    }
    await setStatusByCode(newStock, onHold ? 'onHold' : 'released')
  },
  async issue({ stock, date, carrierId, address, documents, images }) {
    const { models: { stockIssue: stockIssues } } = getDatabase()
    const {
      documents: documentsInclude,
      images: imagesInclude
    } = getIssueIncludes(getDatabase())
    const stockIssue = await stockIssues.create({ date, carrierId, documents, images }, { include: [documentsInclude, imagesInclude] })
    await stockIssue.createAddress(address)
    stock.setIssue(stockIssue)
  }
}
