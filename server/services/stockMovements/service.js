const config = require('config')
const { BadRequest } = require('feathers-errors')
const hooks = require('./hooks')
const getDatabase = require('../../../server/database')
const { getIncludes } = require('../stock/helpers')
const {
  setStatusByCode,
  releaseToCustomer,
  reduceUnitsByReferences,
  reduceUnitsTotally,
  issue
} = require('./helpers')


const servicePath = `${config.apiPath}/stockMovements`
module.exports = function () {
  const app = this
  app.use(
    servicePath,
    {
      async create(data, { user }) {
        try {
          const database = getDatabase()
          const { models: { stock: stocks } } = database
          const { stockBox, stockPallets, references } = getIncludes(getDatabase())
          const {
            id,
            date,
            movementType,
            releaseType,
            movementTypeId,
            targetCustomerId,
            onHold
          } = data
          const filter = {
            where: {
              id
            },
            include: [stockBox, stockPallets, references]
          }
          const stock = await stocks.findOne(filter)
          await database.transaction(async transaction => {
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
                    await setStatusByCode(stock, 'released', transaction)
                  } else {
                    await releaseToCustomer({ stock, customerId: targetCustomerId, referencesToRelease: stock.references, onHold, transaction })
                    await reduceUnitsTotally(stock, transaction)
                  }
                } else {
                  const referencesToRelease = data.references
                    .filter(({ releaseQuantity }) => releaseQuantity && releaseQuantity > 0)
                    .map(({ id: referenceId, reference, releaseQuantity }) => ({ id: referenceId, reference, quantity: releaseQuantity }))
                  
                  await releaseToCustomer({
                    stock,
                    customerId: sameCustomer ? stock.customerId : targetCustomerId,
                    referencesToRelease,
                    transaction,
                    onHold
                  })
                  
                  await reduceUnitsByReferences(stock, referencesToRelease, transaction)
                }
                break
              case 'issue':
                await issue({ stock, ...data, transaction })
                break
              case 'hold':
                stock.onHold = true
                await setStatusByCode(stock, 'onHold', transaction)
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
