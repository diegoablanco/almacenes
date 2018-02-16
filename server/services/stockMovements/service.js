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
        const { models: { stock: stocks } } = getDatabase()
        const { customer, stockBox, stockPallets } = getIncludes(getDatabase())
        const { body: {
          id,
          movementType,
          releaseType,
          movementTypeId,
          targetCustomerId,
          quantity,
          onHold
        } } = data
        const filter = {
          where: {
            id
          },
          include: [customer, stockBox, stockPallets]
        }
        const stock = await stocks.findOne(filter)
        const sameCustomer = !(targetCustomerId && targetCustomerId !== stock.customer.id)
        switch (movementType) {
          case 'release':
            // release total, mismo cliente o sin cliente destinatario: cambiar estado del stock a liberado
            // release total, diferente cliente dest: crear stock (onHold o no) para el cliente dest, cambiar estado stock a Entregado, mercadería a 0
            // release parcial, mismo cliente o sin cliente destinatario: crear nuevo stock para el cliente, restar mercadería
            // release parcial, diferente cliente dest: crear stock (onHold o no) para el cliente dest, restar mercadería
            await stock.createMovement({ stockMovementTypeId: movementTypeId })
            if (releaseType === 'full') {
              if (sameCustomer) {
                setStatusByCode(stock, 'released')
              } else {
                await releaseToCustomer({ stock, customerId: targetCustomerId, onHold })
                await reduceGoodsTotally(stock)
              }
            } else {
              if (sameCustomer) {
                await releaseToCustomer({ stock, customerId: stock.customer.id, quantity })
              } else {
                await releaseToCustomer({ stock, customerId: targetCustomerId, quantity, onHold })
              }
              await reduceGoodsBy(stock, quantity)
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
