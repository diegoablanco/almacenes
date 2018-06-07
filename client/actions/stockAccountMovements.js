import { change, SubmissionError } from 'redux-form'
import { get, setWith } from 'lodash'
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
async function setProductId(index, ean, dispatch, formName) {
  const query = { ean, $sort: { id: 1 } }
  const { value: { data } } = await dispatch(feathersServices.productTypes.find({ query }))
  if (data.length === 0) {
    return false
  }
  const [{ id: typeId }] = data
  dispatch(change(formName, `products[${index}].typeId`, typeId))
  return true
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
        await dispatch(baseCrudPageActions.showFormModal(
          id,
          {
            movementType: stockMovementType.code
          }
        ))
        dispatch(change(formName, 'movementType', stockMovementType.code))
        dispatch(change(formName, 'movementTypeId', stockMovementType.id))
        dispatch(change(formName, 'date', moment().toDate()))
      }
    },
    validateProducts(values, dispatch, form, field) {
      return async (dispatch, getState) => {
        if (!field) return
        const { formName } = selectors.getUiState(getState())
        const index = parseInt(field.match(/\w+\[(\d)\][\w.]*/)[1], 10)
        const value = get(values, field)
        const valid = await setProductId(index, value, dispatch, formName)
        if (!valid) {
          const errors = { products: values.products.map(() => undefined) }
          setWith(errors, field, 'EAN no encontrado')
          return errors
        }
      }
    },
    createOrUpdate(data) {
      return async (dispatch) => {
        const messageAction = showTimedMessage(`Se ejecutó correctamente ${data.movementType === 'release' ? 'el Release' : 'la Salida'}`)
        let service = {}

        if (data.movementType === 'receive') {
          service = feathersServices.stockAccountReceives
        }
        if (data.movementType === 'issue') {
          service = feathersServices.stockAccountIssues
        }
        const serviceAction = service.create(data)
        try {
          await dispatch(serviceAction)
        } catch (error) {
          throw new SubmissionError(formatAjvToRf(error))
        }
        dispatch(baseCrudPageActions.hideModal())
        dispatch(messageAction)
        await dispatch(baseCrudPageActions.reloadGrid())
      }
    }
  }
}
