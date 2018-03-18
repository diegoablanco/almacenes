const config = require('config')
const { BadRequest } = require('feathers-errors');
const hooks = require('./hooks')
const getDatabase = require('../../../server/database')
const { getIncludes } = require('../stock/helpers')
const {
  setStatusByCode,
  reduceGoodsBy,
  releaseToCustomer,
  reduceGoodsTotally,
  issue
} = require('./helper')


const servicePath = `${config.apiPath}/stockMovements`
module.exports = function () {
  const app = this
  app.use(
    servicePath,
    {
      async create(data, { user }) {
        try {
          const sequelize = getDatabase()
          const { models: { stock: stocks } } = sequelize
          const { stockBox, stockPallets } = getIncludes(getDatabase())
          const {
            id,
            date,
            movementType,
            releaseType,
            movementTypeId,
            targetCustomerId,
            quantity,
            onHold
          } = data
          const filter = {
            where: {
              id
            },
            include: [stockBox, stockPallets]
          }
          const stock = await stocks.findOne(filter)
          await sequelize.transaction(async transaction => {
            await stock.createMovement({ stockMovementTypeId: movementTypeId, createdById: user.id, date }, { transaction })
            const sameCustomer = !(targetCustomerId && targetCustomerId !== stock.customerId)
            switch (movementType) {
              case 'release':
              // release total, mismo cliente o sin cliente destinatario: cambiar estado del stock a liberado
              // release total, diferente cliente dest: crear stock (onHold o no) para el cliente dest, cambiar estado stock a Entregado, mercadería a 0
              // release parcial, mismo cliente o sin cliente destinatario: crear nuevo stock para el cliente, restar mercadería
              // release parcial, diferente cliente dest: crear stock (onHold o no) para el cliente dest, restar mercadería
                if (releaseType === 'full') {
                  if (sameCustomer) {
                    setStatusByCode(stock, 'released', transaction)
                  } else {
                    await releaseToCustomer({ stock, customerId: targetCustomerId, onHold, transaction })
                    await reduceGoodsTotally(stock, transaction)
                  }
                } else {
                  if (sameCustomer) {
                    await releaseToCustomer({ stock, customerId: stock.customerId, quantity, transaction })
                  } else {
                    await releaseToCustomer({ stock, customerId: targetCustomerId, quantity, onHold, transaction })
                  }
                  await reduceGoodsBy(stock, quantity, transaction)
                }
                break
              case 'issue':
                await issue({ stock, ...data, transaction })
                await setStatusByCode(stock, 'fulfilled', transaction)
                break
              default:
                break
            }
            await stock.save({ transaction })
          })
          return {}
        } catch (error) {
          throw new BadRequest({ errors: error.message })
        }
      }
    }
  )

  const service = app.service(servicePath)

  service.hooks(hooks)
}
