
// eslint no-unused-vars: 0,

import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reduxMulti from 'redux-multi';
import createHistory from 'history/createBrowserHistory'
import loggerBasic from './loggerBasic'; // eslint-disable-line no-unused-vars
import { routerMiddleware } from 'react-router-redux'
import { exceptionsMiddleWare } from './exceptions'

export default [
  reduxThunk, // Thunk middleware for Redux
  reduxMulti, // Dispatch multiple actions
  reduxPromiseMiddleware(), // Resolve, reject promises with conditional optimistic updates
  routerMiddleware(createHistory()), // !! IMPORTANT for location.href changes
  //loggerBasic, // A basic middleware logger,
  exceptionsMiddleWare
];
