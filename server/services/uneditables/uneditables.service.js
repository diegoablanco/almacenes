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
          stockItemDetailType,
          stockStatus,
          role
        } } = sequelize
        const phoneTypes = await phoneType.findAll({ attributes: ['id', 'description'] })
        const stockMovementTypes = await stockMovementType.findAll()
        const usersCount = await user.findAll({ attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']] })
        const warehouseInstructions = await warehouseInstruction.findAll({ attributes: ['id', 'description'] })
        const documentTypes = await documentType.findAll({ attributes: ['id', 'description', 'type'] })
        const stockItemDetailTypes = await stockItemDetailType.findAll({ attributes: ['id', 'description', 'code'] })
        const roles = await role.findAll({ attributes: ['id', 'description', 'code'] })
        const stockStatuses = await stockStatus.findAll()

        res.json({
          phoneTypes,
          stockMovementTypes,
          warehouseInstructions,
          registerOpen: usersCount[0].get('total') === 0,
          documentTypes,
          stockItemDetailTypes,
          stockStatuses,
          roles
        })
      } catch (e) {
        next(e)
      }
    },
  )
}
