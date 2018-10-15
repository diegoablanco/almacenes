
const path = require('path');

const root = process.cwd();

module.exports = {
  server: {
    host: 'localhost',
    port: process.env.PORT
  },
  logs: {
    logLevel: 'info',
    path: path.join(root, 'logs'),
    logConsoleLevel: 'info'
  },
  database: {
    path: path.join(root, 'data')
  },
  uploads: {
    path: path.join(root, 'public', 'uploads')
  }
};
