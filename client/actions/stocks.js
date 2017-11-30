import { feathersServices } from '../feathers';
import { getCrudPageActions as getBaseCrudPageActions } from './crudPage'
import crudPages from '../common/CrudPages'
import selectors from '../selectors/stocks'

export default function getCrudPageActions() {
  return {
    ...getBaseCrudPageActions(crudPages.STOCKS, feathersServices.stocks, selectors),
    findCustomers(search) {
      return dispatch => {
        const query = {
          companyName: {
            $like: `%${search}%`
          },
          entity: 'customer'
        }
        dispatch(feathersServices.stockCustomerLookup.find({
          entity: 'customer',
          query }))
      }
    }
  }
}
