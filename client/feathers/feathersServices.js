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
  stocks: 'stocks',
  stockMovements: 'stockMovements',
  download: 'download',
  productTypes: 'productTypes',
  stockAccountMovements: 'stockAccountMovements'
},
{
  lookupEntities: 'carrierLookup'
},
{
  lookupEntities: 'customerLookup'
},
{
  lookupEntities: 'customerFilterLookup'
},
{
  lookupEntities: 'billingCustomerLookup'
},
{
  lookupEntities: 'warehouseLookup'
},
{
  lookupEntities: 'instructionsLookup'
},
{
  lookupEntities: 'targetCustomerLookup'
}]

// See feathers-reduxify-services::getServicesStatus. Order highest priority msg first.
export const prioritizedListServices = [
  'auth',
  'stocks',
  'stockAccountMovements',
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
  'products',
  'logs']
