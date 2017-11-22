const config = require('config')
const getDatabase = require('../../../server/database')
module.exports = function () {
  const app = this;
  
  app.get(`${config.apiPath}/uneditables`, 
    async (req, res, next)  => {
      const sequelize = getDatabase()
      try {
        const a = 1
        const {models: {
          phoneType,
          stockMovement
        }} = sequelize
        const phoneTypeModels = await phoneType.findAll({ attributes: ['id', 'description'] })
        const stockMovementModels = await stockMovement.findAll({ attributes: ['id', 'description'] })
        res.json({
          phoneTypes: phoneTypeModels,
          stockMovements: stockMovementModels
        })
      }
      catch(e){
        next(e)
      }
    },
  )
}
