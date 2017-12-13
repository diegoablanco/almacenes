const baseAttachment = require('./baseAttachment')

module.exports = function (sequelize) {
  return sequelize.define('fileAttachment', baseAttachment)
};
