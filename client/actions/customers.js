import { initialize as initializeReduxForm} from 'redux-form'
import { bindActionCreators  } from 'redux'
import { feathersServices } from '../feathers';
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes } from './crudPage'
import { crudPages } from '../common/CrudPages'
import * as selectors from '../selectors/customers'

const actionTypes = getActionTypes(crudPages.CUSTOMERS)
const serviceActionCreators = bindActionCreators(feathersServices.customers)
export function getCrudPageActions(){
    return {
        ...getBaseCrudPageActions(crudPages.CUSTOMERS, feathersServices.customers, selectors),
        showFormModal: function(id){
            return (dispatch, getState) => {
                dispatch({ type: actionTypes.SHOW_MODAL, id })
            }
        },
        initializeForm: function(formName, id, defaultData){
            return (dispatch, getState) => {
                dispatch(feathersServices.phoneTypes.find()).then(
                    () => {
                        if(id)
                            dispatch(feathersServices.customers.get(id))
                                .then((response) => {
                                    dispatch(initializeReduxForm(formName, response.value))
                                    dispatch({ type: actionTypes.HIDE_MODAL_LOADING_INDICATOR })
                                })                  
                        else{
                            dispatch(initializeReduxForm(formName, defaultData))
                            dispatch({ type: actionTypes.HIDE_MODAL_LOADING_INDICATOR })
                        }

                    }
                )
            }
        },
    }
}