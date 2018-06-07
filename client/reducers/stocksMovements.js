import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'
import { getActionTypes } from '../actions/stockAccountMovements'

const actionTypes = getActionTypes()
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const crudReducer = getCrudReducer(crudPages.STOCKACCOUNTMOVEMENTS, {
  formName: 'stockAccountMovement',
  enableTreeTabular: true,
  defaultData: {
    products: [{}],
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
  return newState
}
export default function (state, action) {
  return compose(state2 => stockAccountMovementReducer(state2, action), crudReducer)(state, action)
}
