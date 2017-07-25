
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { feathersServices, feathersAuthentication } from './feathers';

export default {
  routing: routerReducer,
  auth: feathersAuthentication.reducer,
  users: feathersServices.users.reducer,
  messages: feathersServices.messages.reducer,
  authManagement: feathersServices.authManagement.reducer,
  form: reduxFormReducer, // reducers required by redux-form
};

