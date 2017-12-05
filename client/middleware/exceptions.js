import { push } from 'react-router-redux'
import { GENERAL_SERVICE_ERROR, NOT_AUTHENTICATED } from '../actions/common'
import { showErrorMessage } from '../actions/messageBar'

export const exceptionsMiddleWare = store => next => action => {
    const actionType = action.type
    if(/SERVICES_[\w]+_REJECTED/.test(actionType)){
      if(action.payload.code === 401){
          store.dispatch({type: NOT_AUTHENTICATED, payload: action.payload})    
          store.dispatch(push('user/signin'))
      }
      else if(action.error){
        store.dispatch(showErrorMessage('Ocurrió un error general en el servicio. Por favor intente nuevamente más tarde'))
        store.dispatch({type: GENERAL_SERVICE_ERROR, payload: action.payload})   
      }
    }
    next(action);
  }