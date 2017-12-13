const baseAttachment = require('./baseAttachment')

module.exports = function (sequelize) {
  const DocumentAttachment = sequelize.define('documentAttachment', baseAttachment)
  DocumentAttachment.associate = function ({ documentType }) {
    DocumentAttachment.belongsTo(documentType)
  }
  return DocumentAttachment
};
