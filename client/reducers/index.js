import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux'
import { feathersServices, feathersAuthentication } from '../feathers';
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
  ui: combineReducers({
    customers: customersPage,
    messageBar
  })
};

