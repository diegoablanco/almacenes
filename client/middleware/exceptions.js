import { GENERAL_SERVICE_ERROR, NOT_AUTHENTICATED } from '../actions/common' 
import { showTimedMessage } from '../actions/messageBar' 
import errors from 'feathers-errors'
import { push } from 'react-router-redux'

export const exceptionsMiddleWare = store => next => action => {
    const actionType = action.type
    if(actionType.startsWith("SERVICES_") && actionType.endsWith("_REJECTED")){
      if(action.payload.code === 401){

          store.dispatch({type: NOT_AUTHENTICATED, payload: action.payload})    
          store.dispatch(push('user/signin'))
      }
      // else{
      //   store.dispatch(showTimedMessage('Ocurrió un error general en el servicio. Por favor intente nuevamente más tarde'))
      //   store.dispatch({type: GENERAL_SERVICE_ERROR, payload: action.payload})   
      // }
    }
    next(action);
  }