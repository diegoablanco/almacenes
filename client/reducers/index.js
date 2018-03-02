import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux'
import { feathersServices, feathersAuthentication } from '../feathers'
import { getCrudReducer } from './crudPage'
import crudPages from '../common/CrudPages'
import messageBar from './messageBar'
import customersReducer from './customers'
import warehousesReducer from './warehouses'
import stocksReducer from './stocks'

export default {
  routing: routerReducer,
  auth: feathersAuthentication.reducer,
  users: feathersServices.users.reducer,
  authManagement: feathersServices.authManagement.reducer,
  form: reduxFormReducer.plugin({
    Stock: (state, action) => {
      switch (action.type) {
        case '@@redux-form/UPDATE_SYNC_ERRORS':
          let validationMessage = '' // eslint-disable-line no-case-declarations
          const { payload: { syncErrors } } = action // eslint-disable-line no-case-declarations
          return {
            ...state,
            error: Object.keys(syncErrors).map(key => syncErrors[key]).filter(error => error.type === 'missingEntity').map(error => error.message)
          }
        default:
          return state
      }
    }
  }),
  customers: feathersServices.customers.reducer,
  warehouses: feathersServices.warehouses.reducer,
  services: feathersServices.services.reducer,
  warehouseServices: feathersServices.warehouseServices.reducer,
  uneditables: feathersServices.uneditables.reducer,
  carriers: feathersServices.carriers.reducer,
  stocks: feathersServices.stocks.reducer,
  ui: combineReducers({
    customers: customersReducer,
    warehouses: warehousesReducer,
    services: getCrudReducer(crudPages.SERVICES, { sortingColumns: {
      description: {
        direction: 'asc',
        position: 0
      }
    } }),
    carriers: getCrudReducer(crudPages.CARRIERS),
    warehouseServices: getCrudReducer(crudPages.WAREHOUSESERVICES),
    stocks: stocksReducer,
    messageBar
  })
};

