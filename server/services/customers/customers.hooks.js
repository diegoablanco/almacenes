const auth = require('feathers-authentication').hooks;
const Ajv = require('ajv')
const commonHooks = require('feathers-hooks-common');
const { validateSchema, setNow } = commonHooks;
const sequelize = require('sequelize')
const customerSchema = require('../../../common/validation/customer.json')
const contactSchema = require('../../../common/validation/contact.json')
const phoneSchema = require('../../../common/validation/phone.json')
const addressSchema = require('../../../common/validation/address.json')
const accountSchema = require('../../../common/validation/account.json')
const errorReducer = require('../../helpers/errorReducer')
const {differenceBy} = require('lodash')

function addIncludes(hook) {
  const {
    models: {
      contact,
      phone,
      address,
      account
    }
  } = hook.app.get('database')
  hook.params.sequelize = hook.params.sequelize || {}
  hook.params.sequelize.
    include = [{
        model: account,
        include: [address]
      },
      {
        model: address
      }, 
      {
        model: contact,
        as: 'authorizedSignatory',
        include: [{model: phone, as: 'phones'}]
      }, 
      {
        model: contact,
        as: 'authorizedPersons',
        through: 'customer_contacts',
        include: [{model: phone, as: 'phones'}]
      }
    ]
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
          raw: false
        }
      },
      addIncludes
    ],
    create: [
      validate(),
      setNow('createdAt'),
      addIncludes
    ],
    update: [
      validate(),
      setNow('updatedAt'),
      function (hook) {
        const {
          models: {
            customer: customerModel,
            address: addressModel,
            contact: contactModel,
            phone: phoneModel,
            account: accountModel
          }
        } = hook.app.get('database')
        const filter = {
          where: {
            id: hook.data.id
          },
          include: [{
              model: accountModel,
              include: [addressModel]
            },
            addressModel, 
            {
              model: contactModel,
              as: 'authorizedSignatory',
              include: [{model: phoneModel, as: 'phones', through: 'contact_phones'}],
            }, 
            {
              model: contactModel,
              as: 'authorizedPersons',
              through: 'customer_contacts',
              include: [{model: phoneModel, as: 'phones', through: 'contact_phones'}],
            }
        ]
        }
        
        customerModel.findOne(filter).then(function (c) {          
          const { address, authorizedSignatory, account, authorizedPersons } = hook.data

          function createOrUpdateAssociations(model, values, includes, previous){
            includes.forEach(includeOption => {
              const {association: {associationAccessor, accessors, associationType, target}, include} = includeOption
              let associationValues = values[associationAccessor]
              
              if(!associationValues)
                return

              if(associationType == "BelongsTo"){
                if(model[associationAccessor].id)
                  model[associationAccessor].update(associationValues)
                else{
                  model[accessors.create](associationValues)     
                }
                if(include)
                  createOrUpdateAssociations(model.get(associationAccessor), associationValues, include, model.previous(associationAccessor))      
              }

              if(associationType == "BelongsToMany"){                
                const {association: through} = includeOption
                
                  associationValues.filter(value => !value.id).forEach(value => 
                    model[accessors.create](value, {through}).then(item => {
                      if(include)
                        createOrUpdateAssociations(item, value, include, model.previous(associationAccessor).find(x => x.id == item.id))  
                    })
                  )                
                  differenceBy(((previous && previous.get(associationAccessor)) || model.previous(associationAccessor)), associationValues, 'id').forEach(toRemove => {
                    model[accessors.remove](toRemove)
                    toRemove.destroy()
                  })              
                  model.get(associationAccessor).forEach((item, index) => {
                    const itemValues = associationValues.find(x => x.id == item.id)
                    if(itemValues){
                      target.upsert(itemValues).then(() => {
                        if(include)
                          createOrUpdateAssociations(item, itemValues, include, model.previous(associationAccessor).find(x => x.id == item.id))  
                      })
                    }
                  })
                }
            })
          }
          c.set(hook.data)
          createOrUpdateAssociations(c, hook.data, c.$options.include)
      })
      }],
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