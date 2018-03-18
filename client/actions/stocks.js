import { change, SubmissionError } from 'redux-form'
import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes as getBaseActionTypes } from './crudPage'
import { showTimedMessage } from './messageBar'
import crudPages from '../common/CrudPages'
import selectors from '../selectors/stocks'
import getLookupEntities from './lookupEntities'
import { formName } from '../screens/Stock/FormContainer';

export function getActionTypes() {
  return {
    ...getBaseActionTypes(crudPages.STOCKS),
    SET_STOCK_MOVEMENT_TYPE: 'SET_STOCK_MOVEMENT_TYPE',
    SET_AVAILABLE_SERVICES: 'SET_AVAILABLE_SERVICES'
  }
}

export default function getCrudPageActions() {
  const { search: searchCustomer, clear: clearCustomer } = getLookupEntities(feathersServices.customerLookup, 'customer', 'companyName')
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
        dispatch(change('Stock', 'movementTypeId', stockMovementType.id))
        dispatch(change('Stock', 'movementType', stockMovementType.code))
        if (stockMovementTypeCode === 'release') {
          dispatch(change('Stock', 'releaseType', 'full'))
        }
        dispatch(change('Stock', 'date', new Date()))
        
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
    createOrUpdate(data) {
      return async (dispatch) => {
        if (data.movementType === 'release' || data.movementType === 'issue') {
          const messageAction = showTimedMessage(`Se ejecutó correctamente ${data.movementType === 'release' ? 'el Release' : 'la Salida'}`)
          const serviceAction = feathersServices.stockMovements.create(data)
          try {
            await dispatch(serviceAction)
          } catch (error) {
            const details = JSON.stringify(error.errors)
            throw new SubmissionError({ _error: `Ocurrió un error al guardar. Detalles: ${details}` })
          }
          dispatch(baseCrudPageActions.hideModal())
          dispatch(messageAction)
          await dispatch(baseCrudPageActions.reloadGrid())
        } else dispatch(baseCrudPageActions.createOrUpdate(data))
      }
    }
  }
}
