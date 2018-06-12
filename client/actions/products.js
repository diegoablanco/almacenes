import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import { productTypes } from '../selectors'
import getLookupEntities from './lookupEntities'

export function getCrudPageActions() {
  const { search: searchProductCategory, clear: clearProductCategory } = getLookupEntities(feathersServices.productCategoryLookup, 'productCategory', 'description')
  const baseCrudPageActions = getBaseCrudPageActions(
    crudPages.PRODUCTS,
    feathersServices.productTypes,
    productTypes
  )

  return {
    ...baseCrudPageActions,
    searchProductCategory,
    clearProductCategory
  }
}
