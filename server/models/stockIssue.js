const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockIssue = sequelize.define('stockIssue', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      default: Sequelize.DataTypes.Now
    }
  })
  StockIssue.associate = function ({
    address,
    carrier,
    documentAttachment,
    fileAttachment,
    stockReference,
    user
  }) {
    StockIssue.belongsTo(address)
    StockIssue.belongsTo(carrier)
    StockIssue.belongsToMany(documentAttachment, { as: 'documents', through: 'stockIssue_documents' })
    StockIssue.belongsToMany(fileAttachment, { as: 'images', through: 'stockIssue_images' })
    StockIssue.belongsToMany(stockReference, { as: 'references', through: 'stock_issue_references' })
    StockIssue.belongsTo(user, { as: 'createdBy' })
    StockIssue.belongsTo(user, { as: 'updatedBy' })
  }
  return StockIssue
}
