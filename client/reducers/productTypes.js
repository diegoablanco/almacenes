import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'
import { feathersServices } from '../feathers'

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const crudReducer = getCrudReducer(crudPages.PRODUCTS, {
  formName: 'product'
})
const {
  productCategoryLookup
} = feathersServices
function productReducer(state, action) {
  const newState = state

  return {
    ...newState,
    productCategoryLookup: productCategoryLookup.reducer(state.productCategoryLookup, action)
  }
}
export default function (state, action) {
  return compose(state2 => productReducer(state2, action), crudReducer)(state, action)
}
