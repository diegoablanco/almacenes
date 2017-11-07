const config = require('config');

const createService = require('./messages.class.js');
const hooks = require('./messages.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function () { 
  const app = this
  const options = {
    name: 'messages'
  };

  // Initialize our service with any options it requires
  app.use('/messages', Mailer(smtpTransport({
    //service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: config.email.providers.gmail.user,
      pass: config.email.providers.gmail.password
    }
  })));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('messages');

  service.hooks(hooks);
}