import { push } from 'react-router-redux'
import errors from 'feathers-errors'
import { GENERAL_SERVICE_ERROR, NOT_AUTHENTICATED } from '../actions/common'
import { showTimedMessage } from '../actions/messageBar'

export const exceptionsMiddleWare = store => next => action => {
    const actionType = action.type
    if(/SERVICES_[\w]+_REJECTED/.test(actionType)){
      if(action.payload instanceof errors.NotAuthenticated){
          store.dispatch({type: NOT_AUTHENTICATED, payload: action.payload})    
          store.dispatch(push('user/signin'))
      }
      else if(action.error && !(action.payload instanceof errors.BadRequest)){
        store.dispatch(showTimedMessage('Ocurrió un error general en el servicio. Por favor intente nuevamente más tarde', "error"))
        store.dispatch({type: GENERAL_SERVICE_ERROR, payload: action.payload})   
      }
    }
    next(action);
  }