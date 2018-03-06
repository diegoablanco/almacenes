const Sequelize = require('sequelize')
const JsonField = require('sequelize-json')
const debug = require('debug')('service:verifyReset');

module.exports = function (sequelize) {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isVerified: {
      type: Sequelize.BOOLEAN
    },
    verifyToken: {
      type: Sequelize.STRING
    },
    verifyShortToken: {
      type: Sequelize.STRING
    },
    verifyExpires: {
      type: Sequelize.DATE
    },
    resetToken: {
      type: Sequelize.STRING
    },
    resetShortToken: {
      type: Sequelize.STRING
    },
    resetExpires: {
      type: Sequelize.DATE
    },
    verifyChanges: JsonField(sequelize, 'user', 'verifyChanges', { type: Sequelize.DataTypes.NONE })
  })
  User.associate = function ({ role }) {
    User.belongsToMany(role, { through: 'user_roles' })
  }
  return User
}
