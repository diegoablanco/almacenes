import { initialize as initializeReduxForm} from 'redux-form'
import { bindActionCreators  } from 'redux'
import { feathersServices } from '../feathers';
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes } from './crudPage'
import { crudPages } from '../common/CrudPages'
import * as selectors from '../selectors/customers'

const actionTypes = getActionTypes(crudPages.CUSTOMERS)
const serviceActionCreators = bindActionCreators(feathersServices.customers)
export const warehouseActions = {
    SHOW_SERVICE_MODAL: "SHOW_SERVICE_MODAL"
}
export function getCrudPageActions(){
    return {
        ...getBaseCrudPageActions(crudPages.WAREHOUSES, feathersServices.waarehouses, selectors),
        showServiceFormModal: function(id){
            return (dispatch, getState) => {
                dispatch({ type: warehouseActions.SHOW_SERVICE_MODAL, id })
            }
        },
    }
}