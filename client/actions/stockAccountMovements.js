import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import { stockAccountMovements as selectors } from '../selectors'

export const warehouseActions = {
  SHOW_SERVICE_MODAL: 'SHOW_SERVICE_MODAL'
}
export function getCrudPageActions() {
  return getBaseCrudPageActions(crudPages.STOCKACCOUNTMOVEMENTS, feathersServices.stockAccountMovements, selectors)
}
