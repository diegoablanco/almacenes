// See feathers-reduxify-services::default
export const mapServicePathsToNames = [{
  users: 'users',
  messages: 'messages',
  logs: 'logs',
  config: 'config',
  authManagement: 'authManagement',
  customers: 'customers',
  lookupEntities: 'lookupEntities',
  warehouses: 'warehouses',
  services: 'services',
  warehouseServices: 'warehouseServices',
  uneditables: 'uneditables',
  carriers: 'carriers',
  stocks: 'stocks'
},
{
  lookupEntities: 'carrierLookup'
},
{
  lookupEntities: 'customerLookup'
},
{
  lookupEntities: 'targetCustomerLookup'
}]

// See feathers-reduxify-services::getServicesStatus. Order highest priority msg first.
export const prioritizedListServices = [
  'auth',
  'stocks',
  'users',
  'customers',
  'warehouses',
  'services',
  'warehouseServices',
  'phoneTypes',
  'verifyReset',
  'messages',
  'uneditables',
  'lookupEntities',
  'carriers',
  'logs']
