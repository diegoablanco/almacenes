import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux'
import { feathersServices, feathersAuthentication } from '../feathers';
import {crudPage, getCrudReducer} from './crudPage'
import {crudPages} from '../common/CrudPages'
import customersPage from './customers'
import messageBar from './messageBar'
import customersReducer from './customers'

export default {
  routing: routerReducer,
  auth: feathersAuthentication.reducer,
  users: feathersServices.users.reducer,
  authManagement: feathersServices.authManagement.reducer,
  form: reduxFormReducer,
  customers: feathersServices.customers.reducer,
  warehouses: feathersServices.warehouses.reducer,
  services: feathersServices.services.reducer,
  phoneTypes: feathersServices.phoneTypes.reducer,
  ui: combineReducers({
    customers: customersReducer,
    warehouses: getCrudReducer(crudPages.WAREHOUSES),
    services: getCrudReducer(crudPages.SERVICES, {sortingColumns: {
        'description': {
            direction: 'asc',
            position: 0
        }
    }}),
    messageBar
  })
};

