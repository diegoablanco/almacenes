const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
const config = require('config')

const returnEmail = ''
const jade = require('jade')

const { email: { from: fromEmail } } = config

module.exports = function (app) {
  function getLink(type, hash) {
    let { server: { port, host, protocal } } = config
    port = (port === '80' || isProd) ? '' : `:${port}`
    host = (host === 'HOST') ? 'localhost' : host
    protocal = (protocal === 'PROTOCAL') ? 'http' : protocal
    protocal += '://'
    return `${protocal}${host}${port}${config.appPath}/user/${type}/${hash}`
  }

  function sendEmail(email) {
    return app.service('messages').create(email).then((result) => {
      console.log('Sent email', result)
    }).catch(err => {
      console.log('Error sending email', err)
    })
  }

  return function (type, user) {
    console.log(`-- Preparing email for ${type}`)
    let hashLink
    const { server: { serverPath } } = config
    const emailAccountTemplatesPath = path.join(serverPath, 'email-templates')
    let templateFile
    let subject

    switch (type) {
      case 'resendVerifySignup': // send another email with link for verifying user's email addr

        hashLink = getLink('verify', user.verifyToken)
        templateFile = 'verify-email.jade'
        subject = 'Confirmar registro de usuario'

        break
      case 'verifySignup': // inform that user's email is now confirmed

        hashLink = getLink('verify', user.verifyToken)
        templateFile = 'email-verified.jade'
        subject = 'Email confirmado'

        break
      case 'sendResetPwd': // inform that user's email is now confirmed

        hashLink = getLink('forgot', user.resetToken)
        templateFile = 'reset-password.jade'
        subject = 'Blanquear contraseña'

        break
      case 'resetPwd': // inform that user's password was reset

        templateFile = 'password-was-reset.jade'
        subject = 'Contraseña blanqueada'

        break
      case 'passwordChange':
        templateFile = 'password-change.jade'
        subject = 'Your password was changed'

        break
      case 'identityChange':
        hashLink = getLink('verifyChanges', user.verifyToken)
        templateFile = 'identity-change.jade'
        subject = 'Your account was changed. Please verify the changes'

        break
      default:
        break
    }

    const templatePath = path.join(emailAccountTemplatesPath, templateFile)

    const compiledHTML = jade.compileFile(templatePath)({
      logo: '',
      name: user.name || user.email,
      hashLink,
      returnEmail,
      changes: user.verifyChanges
    })

    const email = {
      from: fromEmail,
      to: user.email,
      subject: `Sistema Almacenes | ${subject}`,
      html: compiledHTML
    }

    return sendEmail(email)
  }
}
