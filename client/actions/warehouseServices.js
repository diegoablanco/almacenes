import { initialize as initializeReduxForm, getFormValues} from 'redux-form'
import { bindActionCreators  } from 'redux'
import { feathersServices } from '../feathers';
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes, defaultGetQuery } from './crudPage'
import crudPages from '../common/CrudPages'
import * as selectors from '../selectors/warehouseServices'
import * as warehouseSelectors from '../selectors/warehouses'
import { getUiState as getWarehouseUiState }  from '../selectors/warehouses'

const actionTypes = getActionTypes(crudPages.WAREHOUSESERVICES)
const service = feathersServices.warehouseServices
const serviceActionCreators = bindActionCreators(service)
function getQuery(state, selectors){    
    const {id} = getWarehouseUiState(state)
    return { ...defaultGetQuery(state, selectors), warehouseId: id}
}
function getAvailableWarehouseServicesQuery(state){
    const {rows: currentWarehouseServices} = selectors.getUiState(state)
    return {
        id: {$notIn: currentWarehouseServices.map(x => x.serviceId)},
        $sort: {description: 1}
    }
}
function setCanAdd(dispatch, getState){
    const query = {
        ...getAvailableWarehouseServicesQuery(getState()),
        $select: ['id']
    }
    dispatch(feathersServices.services.find({query})).then(({value: {data}}) => 
        dispatch({ type: actionTypes.TOGGLE_CAN_ADD, canAdd: data.length > 0 })
    )
}
export function getCrudPageActions(){
    const baseCrudPageActions = getBaseCrudPageActions(crudPages.WAREHOUSESERVICES, service, selectors, getQuery)

    return {
        ...baseCrudPageActions,        
        initializeForm: function(formName, id, defaultData){
            return (dispatch, getState) => {
                dispatch({ type: actionTypes.SHOW_MODAL })
                const {queryResult: {data: currentWarehouseServices}} = selectors.getServiceState(getState())
                const query = {
                    ...getAvailableWarehouseServicesQuery(getState()),
                    $sort: {description: 1}
                }
                dispatch(feathersServices.services.find({query})).then(
                    () => {
                        if(id)
                            dispatch(service.get(id))
                                .then((response) => {
                                    dispatch(initializeReduxForm(formName, response.value))
                                    dispatch({ type: actionTypes.HIDE_MODAL_LOADING_INDICATOR })
                                })                  
                        else{
                            const {id} = getWarehouseUiState(getState())
                            dispatch(initializeReduxForm(formName, {...defaultData, warehouseId: id}))
                            dispatch({ type: actionTypes.HIDE_MODAL_LOADING_INDICATOR })
                        }

                    }
                )
            }
        },
        loadGrid(){
            return (dispatch, getState) => {
                const query = getQuery(getState(), selectors)
                dispatch(service.find({query})).then(result => {
                    dispatch(baseCrudPageActions.buildRows(result.value))
                    setCanAdd(dispatch, getState)
                })
            }
        },
        createOrUpdate(values){
            return (dispatch, getState) => new Promise((resolve, reject) => {
                dispatch(baseCrudPageActions.createOrUpdate(values)).then(() => {
                    setCanAdd(dispatch, getState)
                    resolve()
                })
            })
        },
        confirmDeleteItem(){
            return (dispatch, getState) => new Promise((resolve, reject) => {
                dispatch(baseCrudPageActions.confirmDeleteItem()).then(() => {
                    setCanAdd(dispatch, getState)
                    resolve()
                })
            })
        }
    }
}