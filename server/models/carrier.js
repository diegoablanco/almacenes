const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Carrier = sequelize.define('carrier', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,

    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
  )
  Carrier.associate = function (models) {
    Carrier.belongsTo(models['address'])
    Carrier.belongsTo(models['account'])
    Carrier.belongsTo(models['contact'], { as: 'authorizedSignatory' })
  }
  return Carrier
}
