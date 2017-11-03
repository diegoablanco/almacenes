import { createAction, handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import errors from 'feathers-errors'
import { feathersServices, feathersAuthentication } from '../feathers'
import { config } from '../utils/config'
import { showTimedMessage, showErrorMessage } from './messageBar'
import { SubmissionError } from 'redux-form'

export function registerUser (user){
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

export function validateUser (user){
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(feathersServices.authManagement.create({
                action: 'checkUnique',
                value: { username: user.username, email: user.email },
                meta: { noErrMsg: true }
            }))
          .then(() => resolve())
          .catch(err => reject(err.errors))
    })
  }
}
export function validateSignUpEmailToken (emailToken){
    return (dispatch) => {
        dispatch(feathersServices.authManagement.create({
                action: 'verifySignupLong',
                value: emailToken
            })).then(result => {
                if(result.errors){
                    switch(result.errors.$className){
                        case "verifyExpired":                        
                            dispatch(showTimedMessage("El código ha expirado. Se ha enviado un nuevo código a su correo"))     
                            resendEmailToken(emailToken)
                        case "badParams":
                            dispatch(showErrorMessage("El código es inválido"))    
                    }
                }
                if(result.value.isVerified){                    
                    dispatch(push('/user/signin'))
                    dispatch(showTimedMessage("Usuario verificado correctamente. Ya puede ingresar al sistema"))
                }
            })           
            .catch(err => {
                if(err instanceof errors.BadRequest){
                    if(err.message === "Verification token has expired."){                                
                        dispatch(showTimedMessage("El código ha expirado. Se ha enviado un nuevo código a su correo"))     
                        dispatch(resendEmailToken({verifyToken: emailToken}))
                    }
                    else
                        dispatch(showErrorMessage("El código es inválido"))  
                }
                    
            })
  }
}
export function resendEmailToken (emailOrToken){
    return (dispatch) => {
        dispatch(feathersServices.authManagement.create({
                action: 'resendVerifySignup',
                value: emailOrToken
            }))
    }
}
export function sendResetPasswordEmail(user){
    return (dispatch) => {
        return new Promise((resolve, reject) => (
            dispatch(feathersServices.authManagement.create({
                    action: 'sendResetPwd',
                    value: {email: user.email}
                }))
            .then(result =>{
                resolve()
                const message = `Se ha enviado un mail con un link para blanquear contraseña a ${user.email}. ` +
                `Será válido por ${config.authEmails.expires.forgotPasswordEmailTokenTimeValidText}.`
                dispatch(showTimedMessage(message))  
                dispatch(push('/user/signin'))  
            })
            .catch(err => {
                if(err instanceof errors.BadRequest)
                    reject(new SubmissionError({_error: "No existe un usuario con el email ingresado"}))
            })
        ))
    }
}
export function resetPassword(token, password){
    return (dispatch) => {
        dispatch(feathersServices.authManagement.create({
                action: 'resetPwdLong',
                value: {token, password}
            }))
        .then(result => {
            const message = `Se cambió correctamente su contraseña`
            dispatch(showTimedMessage(message))  
            dispatch(push('/user/signin'))
        })        
    }
}

export function login(user){    
    return (dispatch) => {
        return new Promise((resolve, reject) => (
        dispatch(feathersAuthentication.authenticate({
            strategy: 'local',
            type: 'local',
            email: user.email,
            password: user.password
          }))
        .then(result => resolve())
        .catch(err => {
            if(err instanceof errors.NotAuthenticated)
                reject(new SubmissionError({_error: "Email o contraseña incorrectos"}))
        })
    ))
    }
}
export function logout(){    
    return (dispatch) => {
        dispatch(feathersAuthentication.logout())
    }
}
