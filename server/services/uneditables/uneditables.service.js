const config = require('config')
const getDatabase = require('../../../server/database')
module.exports = function () {
  const app = this;
  
  app.get(`${config.apiPath}/uneditables`, 
    async (req, res, next)  => {
      const sequelize = getDatabase()
      try {
        const {models: {
          user,
          phoneType,
          stockMovement
        }} = sequelize
        const phoneTypeModels = await phoneType.findAll({ attributes: ['id', 'description'] })
        const stockMovementModels = await stockMovement.findAll({ attributes: ['id', 'description'] })
        const usersCount = await user.findAll({ attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']]
        })
        res.json({
          phoneTypes: phoneTypeModels,
          stockMovements: stockMovementModels,
          registerOpen: usersCount[0].get('total') === 0
        })
      }
      catch(e){
        next(e)
      }
    },
  )
}
