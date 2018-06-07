import { change, SubmissionError } from 'redux-form'
import { get, setWith } from 'lodash'
import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import { stockAccountMovements as selectors } from '../selectors'

export const warehouseActions = {
  SHOW_SERVICE_MODAL: 'SHOW_SERVICE_MODAL'
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

  return {
    ...baseCrudPageActions,
    showFormModal(id, stockMovementTypeCode = 'edit') {
      return async (dispatch, getState) => {
        const { uneditables: { queryResult: { stockMovementTypes } } } = getState()
        const { formName } = selectors.getUiState(getState())
        const stockMovementType = stockMovementTypes.find(x => x.code === stockMovementTypeCode)
        dispatch(change(formName, 'movementType', stockMovementType.code))
        dispatch(change(formName, 'movementTypeId', stockMovementType.id))
        await dispatch(baseCrudPageActions.showFormModal(
          id,
          {
            movementType: stockMovementType.code
          }
        ))
      }
    },
    validateProducts(values, dispatch, form, field) {
      return async (dispatch, getState) => {
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
    }
  }
}
