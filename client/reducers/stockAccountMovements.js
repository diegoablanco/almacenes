import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'
import { getActionTypes } from '../actions/stockAccountMovements'
import { feathersServices } from '../feathers'
import { composeReducers } from '../utils'

const actionTypes = getActionTypes()
const {
  productTypeLookup
} = feathersServices
const crudReducer = getCrudReducer(crudPages.STOCKACCOUNTMOVEMENTS, {
  formName: 'stockAccountMovement',
  defaultData: {
    stockAccountId: 1
  },
  sortingColumns: {
    date: {
      direction: 'desc',
      position: 0
    }
  }
})
function stockAccountMovementReducer(state, action) {
  let newState = state
  if (action.type === actionTypes.SET_STOCK_MOVEMENT_TYPE) {
    newState = { ...state, stockMovementType: action.stockMovementType }
  }
  return {
    ...newState,
    productTypeLookup: productTypeLookup.reducer(state.productTypeLookup, action)
  }
}
export default function (state, action) {
  return composeReducers({ state, action, reducer1: crudReducer, reducer2: stockAccountMovementReducer })
}
