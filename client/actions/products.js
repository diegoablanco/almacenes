import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import { productTypes } from '../selectors'

export function getCrudPageActions() {
  return getBaseCrudPageActions(crudPages.PRODUCTS, feathersServices.productTypes, productTypes)
}
