import { feathersServices } from '../feathers';
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import selectors from '../selectors/stocks'
import getLookupEntities from './lookupEntities'


export default function getCrudPageActions() {
  const { search: searchCustomer, clear: clearCustomer } = getLookupEntities(feathersServices.customerLookup, 'customer', 'companyName')
  const { search: searchTargetCustomer, clear: clearTargetCustomer } = getLookupEntities(feathersServices.targetCustomerLookup, 'customer', 'companyName')
  const { search: searchBillingCustomer, clear: clearBillingCustomer } = getLookupEntities(feathersServices.billingCustomerLookup, 'customer', 'companyName')
  const { search: searchCarrier, clear: clearCarrier } = getLookupEntities(feathersServices.carrierLookup, 'carrier', 'companyName')
  const { search: searchWarehouse, clear: clearWarehouse } = getLookupEntities(feathersServices.warehouseLookup, 'warehouse', 'name')
  const { search: searchInstructions, clear: clearInstructions } = getLookupEntities(feathersServices.instructionsLookup, 'warehouse', 'name')
  return {
    ...getBaseCrudPageActions(crudPages.STOCKS, feathersServices.stocks, selectors),
    ...{ searchCustomer, clearCustomer },
    ...{ searchTargetCustomer, clearTargetCustomer },
    ...{ searchBillingCustomer, clearBillingCustomer },
    ...{ searchCarrier, clearCarrier },
    ...{ searchWarehouse, clearWarehouse },
    ...{ searchInstructions, clearInstructions }
  }
}
