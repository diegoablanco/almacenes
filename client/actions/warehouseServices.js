import { change } from 'redux-form'
import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes, defaultGetQuery } from './crudPage'
import crudPages from '../common/CrudPages'
import * as selectors from '../selectors/warehouseServices'
import { getUiState as getWarehouseUiState } from '../selectors/warehouses'
import { formName } from '../screens/WarehouseService/WarehouseServiceFormContainer'

const actionTypes = getActionTypes(crudPages.WAREHOUSESERVICES)
const service = feathersServices.warehouseServices

function getQuery(state) {
  const { id } = getWarehouseUiState(state)
  return { ...defaultGetQuery(state, selectors), warehouseId: id }
}
function getAvailableWarehouseServicesQuery() {
  return {
    $sort: { description: 1 }
  }
}
function setCanAdd(dispatch) {
  dispatch({ type: actionTypes.TOGGLE_CAN_ADD, canAdd: true })
}
export default function getCrudPageActions() {
  const baseCrudPageActions = getBaseCrudPageActions(
    crudPages.WAREHOUSESERVICES,
    service,
    selectors,
    getQuery
  )
  function initializeForm(formName, id, defaultData) {
    return async (dispatch, getState) => {
      const query = {
        ...getAvailableWarehouseServicesQuery(getState(), id),
        $sort: { description: 1 }
      }
      await dispatch(feathersServices.services.find({ query }))
      dispatch(baseCrudPageActions.initializeForm(formName, id, defaultData))
    }
  }
  function showFormModal(id, query = {}) {
    return async (dispatch, getState) => {
      const { defaultData } = selectors.getUiState(getState())
      dispatch({ type: actionTypes.SHOW_MODAL, id })
      return dispatch(initializeForm(formName, id, defaultData, query))
    }
  }
  function setServiceRate(serviceId) {
    return (dispatch, getState) => {
      const {
        services: { queryResult: { data: services } }
      } = getState()
      const service = services.find(s => s.id === serviceId)
      dispatch(change(formName, 'rate', service.rate))
    }
  }
  return {
    ...baseCrudPageActions,
    showFormModal,
    initializeForm,
    setServiceRate,
    loadGrid() {
      return (dispatch, getState) => {
        const query = getQuery(getState(), selectors)
        dispatch(service.find({ query })).then(result => {
          dispatch(baseCrudPageActions.buildRows(result.value))
          setCanAdd(dispatch)
        })
      }
    },
    createOrUpdate(values) {
      return (dispatch, getState) => new Promise((resolve) => {
        const { id: warehouseId } = getWarehouseUiState(getState())
        dispatch(baseCrudPageActions.createOrUpdate({ ...values, warehouseId })).then(() => {
          setCanAdd(dispatch)
          resolve()
        })
      })
    },
    confirmDeleteItem() {
      return dispatch => new Promise((resolve) => {
        dispatch(baseCrudPageActions.confirmDeleteItem()).then(() => {
          setCanAdd(dispatch)
          resolve()
        })
      })
    }
  }
}
