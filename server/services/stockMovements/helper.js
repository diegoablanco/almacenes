const getDatabase = require('../../../server/database')
const getIncludes = require('../stock/includes')

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
    await goods.save()
  },
  async reduceGoodsTotally(stock) {
    const goods = stock.boxes || stock.palets
    goods.quantity = 0
    await goods.save()
  },
  async releaseToCustomer(stock, customerId, quantity) {
    const { models: { stock: stocks } } = getDatabase()
    const {
      boxes,
      palets,
      warehouseId,
      carrierId,
      instructions
    } = stock.get({ plain: true })
    if (quantity) (boxes || palets).quantity = quantity
    const newStock = await stocks.create(
      { warehouseId, carrierId, instructions, customerId },
      { include: [] }
    )
    if (boxes) {
      const { id, ...newBoxes } = boxes
      await newStock.createBoxes(newBoxes)
    }
    await setStatusByCode(newStock, 'released')
  }
}
