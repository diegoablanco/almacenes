const config = require('config')
const getDatabase = require('../../../server/database')

module.exports = function () {
  const app = this
  app.get(
    `${config.apiPath}/uneditables`,
    async (req, res, next) => {
      const sequelize = getDatabase()
      try {
        const { models: {
          user,
          phoneType,
          stockMovementType,
          warehouseInstruction,
          documentType,
          stockItemDetailType
        } } = sequelize
        const phoneTypes = await phoneType.findAll({ attributes: ['id', 'description'] })
        const stockMovementTypes = await stockMovementType.findAll({ attributes: ['id', 'description', 'code'] })
        const usersCount = await user.findAll({ attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']] })
        const warehouseInstructions = await warehouseInstruction.findAll({ attributes: ['id', 'description'] })
        const documentTypes = await documentType.findAll({ attributes: ['id', 'description'] })
        const stockItemDetailTypes = await stockItemDetailType.findAll({ attributes: ['id', 'description', 'code'] })

        res.json({
          phoneTypes,
          stockMovementTypes,
          warehouseInstructions,
          registerOpen: usersCount[0].get('total') === 0,
          documentTypes,
          stockItemDetailTypes
        })
      } catch (e) {
        next(e)
      }
    },
  )
}
