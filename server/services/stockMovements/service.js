const hooks = require('./hooks')
const config = require('config')
const getDatabase = require('../../../server/database')
const getIncludes = require('../stock/includes')
const { setStatusByCode, reduceGoodsBy, releaseToCustomer, reduceGoodsTotally } = require('./helper')


const servicePath = `${config.apiPath}/stockMovements`
module.exports = function () {
  const app = this
  app.post(
    servicePath,
    async (data, res, next) => {
      try {
        const { models: { stock } } = getDatabase()
        const { customer, stockBox, stockPallets } = getIncludes(getDatabase())
        const { body: {
          id,
          movementType,
          releaseType,
          movementTypeId,
          targetCustomerId,
          quantity
        } } = data
        const filter = {
          where: {
            id
          },
          include: [customer, stockBox, stockPallets]
        }
        const stockModel = await stock.findOne(filter)
        const sameCustomer = !(targetCustomerId && targetCustomerId !== stockModel.customer.id)
        switch (movementType) {
          case 'release':
            // release total, mismo cliente o sin cliente destinatario: cambiar estado del stock a liberado
            // release total, diferente cliente dest: crear stock (onHold o no) para el cliente dest, cambiar estado stock a Entregado, mercadería a 0
            // release parcial, mismo cliente o sin cliente destinatario: crear nuevo stock para el cliente, restar mercadería
            // release parcial, diferente cliente dest: crear stock (onHold o no) para el cliente dest, restar mercadería
            await stockModel.createMovement({ stockMovementTypeId: movementTypeId })
            if (releaseType === 'full') {
              if (sameCustomer) {
                setStatusByCode(stockModel, 'released')
              } else {
                await setStatusByCode(stockModel, 'fulfilled')
                await releaseToCustomer(stockModel, targetCustomerId)
                await reduceGoodsTotally(stockModel)
              }
            } else if (sameCustomer) {
              await reduceGoodsBy(stockModel, quantity)
              await releaseToCustomer(stockModel, stock.customer.id, quantity)
            } else {
              await releaseToCustomer(stockModel, targetCustomerId, quantity)
              await reduceGoodsBy(stockModel, quantity)
            }
            break
          case 'salida':
            
            break
          default:
            break
        }
        res.json({})
      } catch (error) {
        next(error)
      }
    }
  )
}
