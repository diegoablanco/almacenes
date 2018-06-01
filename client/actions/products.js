import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import * as selectors from '../selectors/products'

export function getCrudPageActions() {
  return getBaseCrudPageActions(crudPages.PRODUCTS, feathersServices.products, selectors)
}
