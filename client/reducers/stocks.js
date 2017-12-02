import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'
import { feathersServices } from '../feathers'

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const crudReducer = getCrudReducer(crudPages.STOCKS, {})
function stockReducer(state, action) {
  return {
    ...state,
    customerLookup: feathersServices.customerLookup.reducer(state.customerLookup, action),
    targetCustomerLookup: feathersServices.targetCustomerLookup.reducer(state.targetCustomerLookup, action),
    carrierLookup: feathersServices.carrierLookup.reducer(state.carrierLookup, action)
  }
}
export default function (state, action) {
  return compose(state2 => stockReducer(state2, action), crudReducer)(state, action)
}
