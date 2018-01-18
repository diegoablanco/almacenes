import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'
import { getActionTypes } from '../actions/stocks'
import { feathersServices } from '../feathers'

const actionTypes = getActionTypes()
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const crudReducer = getCrudReducer(crudPages.STOCKS, { formName: 'Stock', defaultData: { instructions: [] } })
const {
  customerLookup,
  targetCustomerLookup,
  billingCustomerLookup,
  carrierLookup,
  warehouseLookup,
  instructionsLookup
} = feathersServices
function stockReducer(state, action) {
  let newState = state
  if (action.type === actionTypes.SET_STOCK_MOVEMENT_TYPE) {
    newState = { ...state, stockMovementType: action.stockMovementType }
  }

  return {
    ...newState,
    customerLookup: customerLookup.reducer(state.customerLookup, action),
    targetCustomerLookup: targetCustomerLookup.reducer(state.targetCustomerLookup, action),
    billingCustomerLookup: billingCustomerLookup.reducer(state.billingCustomerLookup, action),
    carrierLookup: carrierLookup.reducer(state.carrierLookup, action),
    warehouseLookup: warehouseLookup.reducer(state.warehouseLookup, action),
    instructionsLookup: instructionsLookup.reducer(state.instructionsLookup, action)
  }
}
export default function (state, action) {
  return compose(state2 => stockReducer(state2, action), crudReducer)(state, action)
}