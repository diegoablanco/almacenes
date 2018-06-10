import { change, SubmissionError, arrayPush, reset, focus } from 'redux-form'
import moment from 'moment'
import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes as getBaseActionTypes } from './crudPage'
import crudPages from '../common/CrudPages'
import { stockAccountMovements as selectors } from '../selectors'
import { formatAjvToRf } from '../common/Validation'
import { showTimedMessage } from './messageBar'


export function getActionTypes() {
  return {
    ...getBaseActionTypes(crudPages.STOCKS),
    SET_STOCK_MOVEMENT_TYPE: 'SET_STOCK_MOVEMENT_TYPE',
    SET_AVAILABLE_SERVICES: 'SET_AVAILABLE_SERVICES'
  }
}
export function getCrudPageActions() {
  const baseCrudPageActions = getBaseCrudPageActions(crudPages.STOCKACCOUNTMOVEMENTS, feathersServices.stockAccountMovements, selectors)
  const actionTypes = getActionTypes()

  return {
    ...baseCrudPageActions,
    showFormModal(id, stockMovementTypeCode = 'edit') {
      return async (dispatch, getState) => {
        const { uneditables: { queryResult: { stockMovementTypes } } } = getState()
        const { formName } = selectors.getUiState(getState())
        const stockMovementType = stockMovementTypes.find(x => x.code === stockMovementTypeCode)
        dispatch({ type: actionTypes.SET_STOCK_MOVEMENT_TYPE, stockMovementType })
        await dispatch(baseCrudPageActions.showFormModal(id))
        dispatch(change(formName, 'type', stockMovementType.code))
        dispatch(change(formName, 'movementTypeId', stockMovementType.id))
        dispatch(change(formName, 'date', moment().toDate()))
      }
    },
    createOrUpdate(data) {
      return async (dispatch) => {
        const messageAction = showTimedMessage(`Se ejecutó correctamente ${data.movementType === 'release' ? 'el Release' : 'la Salida'}`)
        try {
          await dispatch(feathersServices.stockAccountMovements.create(data))
        } catch (error) {
          throw new SubmissionError(formatAjvToRf(error))
        }
        dispatch(baseCrudPageActions.hideModal())
        dispatch(messageAction)
        await dispatch(baseCrudPageActions.reloadGrid())
      }
    },
    addProduct({ ean, code }) {
      return async (dispatch, getState) => {
        const { formName } = selectors.getUiState(getState())
        const query = { ean, $sort: { id: 1 } }
        const { value: { data } } = await dispatch(feathersServices.productTypes.find({ query }))
        if (data.length === 0) {
          throw new SubmissionError({ ean: 'EAN no encontrado' })
        }
        const [{ id: typeId, description }] = data
        dispatch(arrayPush(formName, 'products', { typeId, code, type: { ean, description } }))
        dispatch(reset('addProduct'))
        dispatch(focus('addProduct', 'ean'))
      }
    }
  }
}
