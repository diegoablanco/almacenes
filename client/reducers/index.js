import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux'
import { feathersServices, feathersAuthentication } from '../feathers';
import {crudPage, getCrudReducer} from './crudPage'
import {crudPages} from '../common/CrudPages'
import customersPage from './customers'
import messageBar from './messageBar'
import customersReducer from './customers'
import warehousesReducer from './warehouses'

export default {
  routing: routerReducer,
  auth: feathersAuthentication.reducer,
  users: feathersServices.users.reducer,
  authManagement: feathersServices.authManagement.reducer,
  form: reduxFormReducer,
  customers: feathersServices.customers.reducer,
  warehouses: feathersServices.warehouses.reducer,
  services: feathersServices.services.reducer,
  warehouseServices: feathersServices.warehouseServices.reducer,
  uneditables: feathersServices.uneditables.reducer,
  carriers: feathersServices.carriers.reducer,
  ui: combineReducers({
    customers: customersReducer,
    warehouses: warehousesReducer,
    services: getCrudReducer(crudPages.SERVICES, {sortingColumns: {
        'description': {
            direction: 'asc',
            position: 0
        }
    }}),    
    warehouses: warehousesReducer,
    carriers: getCrudReducer(crudPages.CARRIERS),
    warehouseServices: getCrudReducer(crudPages.WAREHOUSESERVICES),    
    messageBar
  })
};

