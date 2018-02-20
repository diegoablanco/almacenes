import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import errors from 'feathers-errors'
import { feathersServices, feathersAuthentication } from '../feathers'
import { config } from '../utils/config'
import { showTimedMessage, showErrorMessage } from './messageBar'

export function registerUser(user) {
  return (dispatch) => {
    dispatch(feathersServices.users.create(user))
      .then(() => {
        const message =
                        `Un mail con el link de confirmación se ha enviado a ${user.email}. ` +
                        `Tendrá validez por ${config.authEmails.expires.signUpEmailTokenTimeValidText}.`
        dispatch(push('/user/signin'))
        dispatch(showTimedMessage(message))
      })
  }
}

export function validateUser(user) {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(feathersServices.authManagement.create({
      action: 'checkUnique',
      value: { username: user.username, email: user.email },
      meta: { noErrMsg: true }
    }))
      .then(() => resolve())
      .catch(err => reject(err.errors))
  })
}
export function resendEmailToken(emailOrToken) {
  return (dispatch) => {
    dispatch(feathersServices.authManagement.create({
      action: 'resendVerifySignup',
      value: emailOrToken
    }))
  }
}
export function validateSignUpEmailToken(emailToken) {
  return (dispatch) => {
    dispatch(feathersServices.authManagement.create({
      action: 'verifySignupLong',
      value: emailToken
    })).then(result => {
      if (result.errors) {
        switch (result.errors.$className) {
          case 'verifyExpired':
            dispatch(showTimedMessage('El código ha expirado. Se ha enviado un nuevo código a su correo'))
            resendEmailToken(emailToken)
            break
          case 'badParams':
            dispatch(showErrorMessage('El código es inválido'))
            break
          default:
        }
      }
      if (result.value.isVerified) {
        dispatch(push('/user/signin'))
        dispatch(showTimedMessage('Usuario verificado correctamente. Ya puede ingresar al sistema'))
      }
    })
      .catch(err => {
        if (err instanceof errors.BadRequest) {
          if (err.message === 'Verification token has expired.') {
            dispatch(showTimedMessage('El código ha expirado. Se ha enviado un nuevo código a su correo'))
            dispatch(resendEmailToken({ verifyToken: emailToken }))
          } else dispatch(showErrorMessage('El código es inválido'))
        }
      })
  }
}
export function sendResetPasswordEmail(user) {
  return (dispatch) => new Promise((resolve, reject) => (
    dispatch(feathersServices.authManagement.create({
      action: 'sendResetPwd',
      value: { email: user.email }
    }))
      .then(() => {
        resolve()
        const message = `Se ha enviado un mail con un link para blanquear contraseña a ${user.email}. ` +
                `Será válido por ${config.authEmails.expires.forgotPasswordEmailTokenTimeValidText}.`
        dispatch(showTimedMessage(message))
        dispatch(push('/user/signin'))
      })
      .catch(err => {
        if (err instanceof errors.BadRequest) reject(new SubmissionError({ _error: 'No existe un usuario con el email ingresado' }))
      })
  ))
}
export function resetPassword(token, password) {
  return (dispatch) => {
    dispatch(feathersServices.authManagement.create({
      action: 'resetPwdLong',
      value: { token, password }
    }))
      .then(() => {
        const message = 'Se cambió correctamente su contraseña'
        dispatch(showTimedMessage(message))
        dispatch(push('/user/signin'))
      })
  }
}

export function login(user) {
  return (dispatch) => new Promise((resolve, reject) => (
    dispatch(feathersAuthentication.authenticate({
      strategy: 'local',
      type: 'local',
      email: user.email,
      password: user.password
    }))
      .then(() => resolve())
      .catch(err => {
        if (err instanceof errors.NotAuthenticated) reject(new SubmissionError({ _error: 'Email o contraseña incorrectos' }))
      })
  ))
}
export function logout() {
  return (dispatch) => {
    dispatch(feathersAuthentication.logout())
  }
}
export function changePassword({ oldPassword, newPassword: password }) {
  return async (dispatch, getState) => {
    const { auth: { user: { email } } } = getState()
    try {
      await dispatch(feathersServices.authManagement.create({
        action: 'passwordChange',
        value: {
          oldPassword,
          password,
          user: { email }
        }
      }))
      const message = 'Se cambió correctamente su contraseña'
      dispatch(showTimedMessage(message))
      dispatch(push('/user/signin'))
    } catch (err) {
      throw new SubmissionError({ errors: err.errors, _error: err.message || '' })
    }
  }
}
