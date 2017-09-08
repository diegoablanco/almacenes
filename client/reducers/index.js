import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux'
import { feathersServices, feathersAuthentication } from '../feathers';
import {crudPage, getCrudReducer} from './crudPage'
import {crudPages} from '../common/CrudPages'
import customersPage from './customers'
import messageBar from './messageBar'

export default {
  routing: routerReducer,
  auth: feathersAuthentication.reducer,
  users: feathersServices.users.reducer,
  messages: feathersServices.messages.reducer,
  authManagement: feathersServices.authManagement.reducer,
  form: reduxFormReducer, // reducers required by redux-form
  customers: feathersServices.customers.reducer,
  warehouses: feathersServices.warehouses.reducer,
  ui: combineReducers({
    customers: getCrudReducer(crudPages.CUSTOMERS),
    warehouses: getCrudReducer(crudPages.WAREHOUSES),
    messageBar
  })
};

