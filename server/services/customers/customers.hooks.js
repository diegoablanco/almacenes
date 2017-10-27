const auth = require('feathers-authentication').hooks;
const Ajv = require('ajv')
const commonHooks = require('feathers-hooks-common');
const {
  validateSchema,
  setCreatedAt,
  setUpdatedAt
} = commonHooks;
const customerSchema = require('../../../common/validation/customer.json')
const contactSchema = require('../../../common/validation/contact.json')
const phoneSchema = require('../../../common/validation/phone.json')
const addressSchema = require('../../../common/validation/address.json')
const accountSchema = require('../../../common/validation/account.json')
const errorReducer = require('../../helpers/errorReducer')

function addIncludes(hook) {
  const {
    models: {
      contact,
      phone,
      address,
      account
    }
  } = hook.app.get('database')
  hook.params.sequelize = {
    include: [{
        model: account,
        include: [address]
      },
      {
        model: address
      }, 
      {
        model: contact,
        as: 'authorizedSignatory',
        include: [phone],
        scope: { contactType: 'customerAuthorizedSignatory' }
      }, 
      {
        model: contact,
        as: 'authorizedPersons',
        include: [phone],
        scope: { contactType: 'customerAuthorizedPerson' }
      }
    ]
  }
}
function validate(){
  var ajv = Ajv({allErrors: true})
  ajv.addSchema(customerSchema)
  ajv.addSchema(contactSchema)
  ajv.addSchema(phoneSchema)
  ajv.addSchema(addressSchema)
  ajv.addSchema(accountSchema)
  
  return validateSchema(customerSchema, ajv, {
    addNewError: errorReducer
  })
} 
module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [
      function (hook) {
        const {
          models: {
            address
          }
        } = hook.app.get('database')
        hook.params.sequelize = {
          raw: false,
          include: [address]
        }
      }
    ],
    get: [
      function (hook) {
        const {
          models: {
            address,
            contact,
            account,
            phone
          }
        } = hook.app.get('database')
        hook.params.sequelize = {
          raw: false,
          include: [address, {
            model: account,
            include: [address]
          }, 
          {
            model: contact,
            as: 'authorizedSignatory',
            scope: { contactType: 'customerAuthorizedSignatory' }
          }]
        }
      }
    ],
    create: [
      validate(),
      setCreatedAt(),
      addIncludes
    ],
    update: [
      validate(),
      function (hook) {
        const {
          models: {
            customer,
            address,
            contact,
            phone,
            account
          }
        } = hook.app.get('database')
        const filter = {
          where: {
            id: hook.data.id
          },
          include: [{
              model: account,
              include: [address]
            },
            address, 
            {
              model: contact,
              as: 'authorizedSignatory',
              include: [phone],
              scope: { contactType: 'customerAuthorizedSignatory' }
            }, 
            {
              model: contact,
              as: 'authorizedPersons',
              include: [phone],
              scope: { contactType: 'customerAuthorizedPerson' }
            }
        ]
        }
        customer.findOne(filter).then(function (c) {          
          if(hook.data.address){
            if(c.address)
              c.address.update(hook.data.address)
            else{
              address.create(hook.data.address).then(address => c.setAddress(address))
            }
          }

          if(hook.data.authorizedSignatory){
            if (c.authorizedSignatory)
              c.authorizedSignatory.updateAttributes(hook.data.authorizedSignatory)
            else {
              contact.create(hook.data.authorizedSignatory).then(authorizedSignatory => c.setAuthorizedSignatory(authorizedSignatory))
            }
          }
          

          if(hook.data.account){
            if(c.account){
              c.account.update(hook.data.account)
              
              if(hook.data.account.address){
                if(c.account.address)
                  c.account.address.update(hook.data.account.address)
                else
                  address.create(hook.data.account.address).then(address => c.account.setAddress(address))
              }
            }
            else
              account.create(hook.data.account, {include: [address]}).then(account => c.setAccount(account))
          }

          if(hook.data.authorizedPersons){
            hook.data.authorizedPersons.filter(authorizedPerson => authorizedPerson.id).forEach(authorizedPerson => 
              contact.update(authorizedPerson))
            hook.data.authorizedPersons.filter(authorizedPerson => !authorizedPerson.id)
            .forEach(authorizedPerson => 
              contact.create(authorizedPerson).then(authorizedPerson => 
                c.addAuthorizedPerson(authorizedPerson))
            )
          }
        })
      }
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [function (hook) {
      var a
    }],
    get: [
      function (context) {
          if(context.result.dataValues.address === null)
            delete context.result.dataValues.address
          if(context.result.dataValues.authorizedSignatory === null)
            delete context.result.dataValues.authorizedSignatory
          if(context.result.dataValues.account === null)
            delete context.result.dataValues.account
      }],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};