const config = require('config')
const debug = require('debug')('server:app')
const path = require('path')

module.exports = function serveHtmlForEnvironment(req, res) {
  let html

  switch (config.NODE_ENV) {
    case 'devserver':
      html = './index-devserver.html';
      break;
    case 'production': // fall through
    case 'development': // fall through
    default:
      html = path.join('.', 'dist', 'index.html');
  }

  debug(`Serve file ${html} in ${config.NODE_ENV}`);
  res.sendFile(html, { root: config.server.publicPath });
}
