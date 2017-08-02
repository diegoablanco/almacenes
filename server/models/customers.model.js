const NeDB = require('nedb');
const path = require('path');
const config = require('config');

module.exports = function (app) {
  const fileName = path.join(config.database.path, 'customers.db');
  const Model = new NeDB({
    filename: fileName,
    autoload: true
  });

  return Model;
};
