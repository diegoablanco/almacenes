const config = require('config');
const hooks = require('./messages.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function () {
  const app = this
  const { email: { user, password, host, port = 25 } } = config
  app.use('/messages', Mailer(smtpTransport({
    host,
    port,
    secure: true, // use SSL
    auth: {
      user,
      pass: password
    }
  })));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('messages');

  service.hooks(hooks);
}
