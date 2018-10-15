
const path = require('path')

const root = process.cwd()

module.exports = {
  logs: {
    logLevel: 'silly',
    path: path.join(root, 'logs-dev'),
    logConsoleLevel: 'silly'
  },
  database: {
    path: path.join(root, 'data-dev'),
    host: '127.0.0.1',
    name: 'warehouses',
    user: 'sa',
    password: '%5H4g,sJ8>.FA$Lg'
  },
  uploads: {
    path: path.join(root, 'public', 'uploads')
  }
};
