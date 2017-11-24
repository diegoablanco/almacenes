
// Customise processing in feathers/index.js for your app

// See feathers-reduxify-services::default
export const mapServicePathsToNames = {
  users: 'users',
  messages: 'messages',
  logs: 'logs',
  config: 'config',
  authManagement: 'authManagement',
  customers: 'customers',
  warehouses: 'warehouses',
  services: 'services',
  warehouseServices: 'warehouseServices',
  uneditables: 'uneditables',
  carriers: 'carriers',
};

// See feathers-reduxify-services::getServicesStatus. Order highest priority msg first.
export const prioritizedListServices = [
  'auth', 
  'users', 
  'customers', 
  'warehouses', 
  'services', 
  'warehouseServices', 
  'phoneTypes', 
  'verifyReset', 
  'messages', 
  'uneditables', 
  'carriers', 
  'logs'];
