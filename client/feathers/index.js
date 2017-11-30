
/* global window */

import feathers from 'feathers-client';
import reduxifyServices, { getServicesStatus } from 'feathers-reduxify-services';
import reduxifyAuthentication from 'feathers-reduxify-authentication';

import { mapServicePathsToNames, prioritizedListServices } from './feathersServices';

// Configure feathers-client
const app = feathers()
  .configure(feathers.rest('http://localhost:3030/api').fetch(window.fetch))
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage, // store the token in localStorage and initially sign in with that
  }))
export default app;

// Reduxify feathers-authentication
export const feathersAuthentication = reduxifyAuthentication(app,
  { isUserAuthorized: (user) => user.isVerified } // user must be verified to authenticate
)
// Reduxify feathers services
export const feathersServices = Object.assign({}, ...mapServicePathsToNames.map(servicePaths => reduxifyServices(app, servicePaths)))

// Convenience method to get status of feathers services, incl feathers-authentication
export const getFeathersStatus =
  (servicesRootState, names = prioritizedListServices) =>
    getServicesStatus(servicesRootState, names);
