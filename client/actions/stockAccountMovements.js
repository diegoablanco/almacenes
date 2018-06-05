import { change } from 'redux-form'
import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import { stockAccountMovements as selectors } from '../selectors'

export const warehouseActions = {
  SHOW_SERVICE_MODAL: 'SHOW_SERVICE_MODAL'
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
    }
  }
}
