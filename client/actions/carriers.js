import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import * as selectors from '../selectors/carriers'

export const warehouseActions = {
  SHOW_SERVICE_MODAL: 'SHOW_SERVICE_MODAL'
}
export function getCrudPageActions() {
  return getBaseCrudPageActions(crudPages.CARRIERS, feathersServices.carriers, selectors)
}
