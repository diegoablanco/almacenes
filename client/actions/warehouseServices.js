import { feathersServices } from '../feathers';
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes, defaultGetQuery } from './crudPage'
import crudPages from '../common/CrudPages'
import * as selectors from '../selectors/warehouseServices'
import { getUiState as getWarehouseUiState } from '../selectors/warehouses'

const actionTypes = getActionTypes(crudPages.WAREHOUSESERVICES)
const service = feathersServices.warehouseServices

function getQuery(state) {
  const { id } = getWarehouseUiState(state)
  return { ...defaultGetQuery(state, selectors), warehouseId: id }
}
function getAvailableWarehouseServicesQuery(state, currentServiceId) {
  const { rows: currentWarehouseServices } = selectors.getUiState(state)
  return {
    id: { $notIn: currentWarehouseServices.filter(x => x.id !== currentServiceId).map(x => x.serviceId) },
    $sort: { description: 1 }
  }
}
function setCanAdd(dispatch, getState) {
  const query = {
    ...getAvailableWarehouseServicesQuery(getState()),
    $select: ['id', 'description']
  }
  dispatch(feathersServices.services.find({ query })).then(({ value: { data } }) =>
    dispatch({ type: actionTypes.TOGGLE_CAN_ADD, canAdd: data.length > 0 }))
}
export default function getCrudPageActions() {
  const baseCrudPageActions = getBaseCrudPageActions(
    crudPages.WAREHOUSESERVICES,
    service,
    selectors,
    getQuery
  )

  return {
    ...baseCrudPageActions,
    initializeForm(formName, id, defaultData) {
      return (dispatch, getState) => {
        dispatch({ type: actionTypes.SHOW_MODAL })
        const query = {
          ...getAvailableWarehouseServicesQuery(getState(), id),
          $sort: { description: 1 }
        }
        dispatch(feathersServices.services.find({ query })).then(() =>
          dispatch(baseCrudPageActions.initializeForm(formName, id, defaultData)))
      }
    },
    loadGrid() {
      return (dispatch, getState) => {
        const query = getQuery(getState(), selectors)
        dispatch(service.find({ query })).then(result => {
          dispatch(baseCrudPageActions.buildRows(result.value))
          setCanAdd(dispatch, getState)
        })
      }
    },
    createOrUpdate(values) {
      return (dispatch, getState) => new Promise((resolve) => {
        const { id: warehouseId } = getWarehouseUiState(getState())
        dispatch(baseCrudPageActions.createOrUpdate({ ...values, warehouseId })).then(() => {
          setCanAdd(dispatch, getState)
          resolve()
        })
      })
    },
    confirmDeleteItem() {
      return (dispatch, getState) => new Promise((resolve) => {
        dispatch(baseCrudPageActions.confirmDeleteItem()).then(() => {
          setCanAdd(dispatch, getState)
          resolve()
        })
      })
    }
  }
}
