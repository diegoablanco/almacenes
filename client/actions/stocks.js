import { feathersServices } from '../feathers';
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import selectors from '../selectors/stocks'
import getLookupEntities from './lookupEntities'


export default function getCrudPageActions() {
  const { search: searchCustomer, clear: clearCustomer } = getLookupEntities(feathersServices.customerLookup, 'customer', 'companyName')
  const { search: searchTargetCustomer, clear: clearTargetCustomer } = getLookupEntities(feathersServices.targetCustomerLookup, 'customer', 'companyName')
  const { search: searchCarrier, clear: clearCarrier } = getLookupEntities(feathersServices.carrierLookup, 'carrier', 'companyName')
  return {
    ...getBaseCrudPageActions(crudPages.STOCKS, feathersServices.stocks, selectors),
    ...{ searchCustomer, clearCustomer },
    ...{ searchTargetCustomer, clearTargetCustomer },
    ...{ searchCarrier, clearCarrier }
  }
}
