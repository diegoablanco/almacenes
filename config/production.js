
const path = require('path');

const root = process.cwd();

module.exports = {
  server: {
    host: 'localhost',
    port: process.env.PORT,
    serverPath: root
  },
  logs: {
    logLevel: 'error',
    path: path.join(root, 'logs'),
    logConsoleLevel: 'error'
  },
  database: {
    path: path.join(root, 'data')
  },
  uploads: {
    path: path.join(root, 'public', 'uploads')
  }
};
