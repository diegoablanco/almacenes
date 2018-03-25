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
import commonFormReducer from './formReducer'

export default {
  routing: routerReducer,
  auth: feathersAuthentication.reducer,
  users: feathersServices.users.reducer,
  authManagement: feathersServices.authManagement.reducer,
  form: reduxFormReducer.plugin({
    stock: commonFormReducer('stock'),
    customer: commonFormReducer('customer'),
    carrier: commonFormReducer('carrier'),
    warehouse: commonFormReducer('warehouse'),
    Service: commonFormReducer('service')
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
    },
    formName: 'Service'
    }),
    carriers: getCrudReducer(crudPages.CARRIERS, { formName: 'Carrier' }),
    warehouseServices: getCrudReducer(crudPages.WAREHOUSESERVICES),
    stocks: stocksReducer,
    messageBar
  })
};

