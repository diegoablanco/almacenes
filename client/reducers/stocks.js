import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'
import { feathersServices } from '../feathers'

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const crudReducer = getCrudReducer(crudPages.STOCKS, {})
function stockReducer(state, action) {
  return {
    ...state,
    customersLookup: feathersServices.stockCustomerLookup.reducer(state.customersLookup, action)
  }
}
export default function (state, action) {
  return compose(state2 => stockReducer(state2, action), crudReducer)(state, action)
}
