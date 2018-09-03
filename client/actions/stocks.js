import { change, SubmissionError, getFormValues, arrayPush, reset } from 'redux-form'
import moment from 'moment'
import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes as getBaseActionTypes } from './crudPage'
import { showTimedMessage } from './messageBar'
import crudPages from '../common/CrudPages'
import selectors from '../selectors/stocks'
import getLookupEntities from './lookupEntities'
import { formName } from '../screens/Stock/FormContainer'
import { formatAjvToRf } from '../common/Validation'

export function getActionTypes() {
  return {
    ...getBaseActionTypes(crudPages.STOCKS),
    SET_STOCK_MOVEMENT_TYPE: 'SET_STOCK_MOVEMENT_TYPE',
    SET_AVAILABLE_SERVICES: 'SET_AVAILABLE_SERVICES'
  }
}

export default function getCrudPageActions() {
  const { search: searchCustomer, clear: clearCustomer } = getLookupEntities(feathersServices.customerLookup, 'customer', 'companyName')
  const { search: searchFilterCustomer, clear: clearFilterCustomer } = getLookupEntities(feathersServices.customerFilterLookup, 'customer', 'companyName')
  const { search: searchTargetCustomer, clear: clearTargetCustomer } = getLookupEntities(feathersServices.targetCustomerLookup, 'customer', 'companyName')
  const { search: searchBillingCustomer, clear: clearBillingCustomer } = getLookupEntities(feathersServices.billingCustomerLookup, 'customer', 'companyName')
  const { search: searchCarrier, clear: clearCarrier } = getLookupEntities(feathersServices.carrierLookup, 'carrier', 'companyName')
  const { search: searchWarehouse, clear: clearWarehouse } = getLookupEntities(feathersServices.warehouseLookup, 'warehouse', 'name')
  const { search: searchInstructions, clear: clearInstructions } = getLookupEntities(feathersServices.instructionsLookup, 'warehouse', 'name')
  const baseCrudPageActions = getBaseCrudPageActions(
    crudPages.STOCKS,
    feathersServices.stocks,
    selectors
  )
  const actionTypes = getActionTypes()
  return {
    ...baseCrudPageActions,
    ...{ searchCustomer, clearCustomer },
    ...{ searchFilterCustomer, clearFilterCustomer },
    ...{ searchTargetCustomer, clearTargetCustomer },
    ...{ searchBillingCustomer, clearBillingCustomer },
    ...{ searchCarrier, clearCarrier },
    ...{ searchWarehouse, clearWarehouse },
    ...{ searchInstructions, clearInstructions },
    showFormModal(id, stockMovementTypeCode = 'edit') {
      return async (dispatch, getState) => {
        const { uneditables: { queryResult: { stockMovementTypes } } } = getState()
        const stockMovementType = stockMovementTypes.find(x => x.code === stockMovementTypeCode)
        dispatch({ type: actionTypes.SET_STOCK_MOVEMENT_TYPE, stockMovementType })
        await dispatch(baseCrudPageActions.showFormModal(
          id,
          {
            movementType: stockMovementType.code
          }
        ))
        if (stockMovementTypeCode === 'receive') {
          dispatch(change('stock', 'references', []))
        }
        dispatch(change('stock', 'movementTypeId', stockMovementType.id))
        dispatch(change('stock', 'movementType', stockMovementType.code))
        if (stockMovementTypeCode === 'release') {
          dispatch(change('stock', 'releaseType', 'full'))
        }
        if (stockMovementTypeCode === 'issue') {
          dispatch(change('stock', 'issueType', 'full'))
        }
        const { date } = getFormValues('stock')(getState())
        if (!date) {
          dispatch(change('stock', 'date', moment().toDate()))
        }

        const query = {
          $select: ['id', 'description', 'rate'],
          $limit: 0,
          $sort: { id: -1 }
        }
        const {
          value: {
            data: availableServices
          } } = await dispatch(feathersServices.services.find({ query }))
        dispatch({ type: actionTypes.SET_AVAILABLE_SERVICES, availableServices })
      }
    },
    setServiceRate(fieldIndex, rate) {
      return (dispatch) => {
        const fieldName = 'services'
        const fieldPrefix = `${fieldName}[${fieldIndex}]`
        dispatch(change(formName, `${fieldPrefix}.rate`, rate))
      }
    },
    addMovementServices(warehouseId) {
      return async (dispatch) => {
        const query = { warehouseId, stockMovementTypeId: 1, $sort: { 'service.description': 1 } }
        const { value: { data: services } } = await dispatch(feathersServices.warehouseServices.find({ query }))
        dispatch(change(formName, 'services', services.map(({
          serviceId,
          warehouseId,
          rate
        }) => ({
          serviceId,
          warehouseId,
          rate
        }))))
      }
    },
    createOrUpdate(data) {
      return async (dispatch) => {
        if (data.movementType === 'release' || data.movementType === 'issue') {
          const messageAction = showTimedMessage(`Se ejecutó correctamente ${data.movementType === 'release' ? 'el Release' : 'la Salida'}`)
          const serviceAction = feathersServices.stockMovements.create(data)
          try {
            await dispatch(serviceAction)
          } catch (error) {
            throw new SubmissionError(formatAjvToRf(error))
          }
          dispatch(baseCrudPageActions.hideModal())
          dispatch(messageAction)
          dispatch(baseCrudPageActions.reloadGrid())
        } else dispatch(baseCrudPageActions.createOrUpdate(data))
      }
    },
    hold(id) {
      return async (dispatch, getState) => {
        const messageAction = showTimedMessage('Se ejecutó correctamente el Hold')
        const { uneditables: { queryResult: { stockMovementTypes } } } = getState()
        const stockMovementType = stockMovementTypes.find(x => x.code === 'hold')
        try {
          await dispatch(feathersServices.stockMovements.create({ id, movementType: 'hold', movementTypeId: stockMovementType.id }))
        } catch (error) {
          throw new SubmissionError(formatAjvToRf(error))
        }
        dispatch(messageAction)
        await dispatch(baseCrudPageActions.reloadGrid())
      }
    },
    addReference(reference) {
      return async (dispatch) => {
        const addReferenceFormName = 'addReference'
        dispatch(arrayPush(formName, 'references', reference))
        dispatch(reset(addReferenceFormName))
      }
    }
  }
}
