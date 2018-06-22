const errors = require('feathers-errors')
const { Op } = require('sequelize')
const getIncludes = require('../includes')

module.exports = async function (hook) {
  const { models: { product, stockAccountMovement } } = hook.app.get('database')
  const { products } = getIncludes(hook.app.get('database'))
  const { id, service: { Model } } = hook
  const { type, products: productsToRemove } = await Model.findById(id, { include: [products] })
  if (type === 'receive') {
    const query = {
      where: { code: { [Op.in]: productsToRemove.map(({ code }) => code) } },
      include: [{ model: stockAccountMovement, where: { stockMovementTypeId: 4 } }]
    }

    const issuedProducts = await product.findAll(query)
    if (issuedProducts.length > 0) {
      throw new errors.BadRequest('No se puede eliminar la entrada porque hay productos con salida')
    }
  }
}
