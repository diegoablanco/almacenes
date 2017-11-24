const auth = require('feathers-authentication').hooks;
const Ajv = require('ajv')
const commonHooks = require('feathers-hooks-common');
const { validateSchema, setNow } = commonHooks;
const sequelize = require('sequelize')
const carrierSchema = require('../../../common/validation/carrier.json')
const contactSchema = require('../../../common/validation/contact.json')
const phoneSchema = require('../../../common/validation/phone.json')
const addressSchema = require('../../../common/validation/address.json')
const accountSchema = require('../../../common/validation/account.json')
const errorReducer = require('../../helpers/errorReducer')
const createOrUpdateAssociations = require('../../models/helpers/createOrUpdateAssociations')

function getIncludes(database){
  const {
    models: {
      contact,
      phone,
      address,
      account
    }
  } = database

  return {
    account: {
      model: account,
      include: [address]
    },
    address: {
      model: address
    },
    authorizedSignatory: {
      model: contact,
      as: 'authorizedSignatory',
      include: [{model: phone, as: 'phones'}]
    } 
  }
}

function addIncludes(hook) {
  const { account, address, authorizedSignatory} = getIncludes(hook.app.get('database'))
  hook.params.sequelize = hook.params.sequelize || {}
  hook.params.sequelize.include = [ account, address, authorizedSignatory]
}

function validate(){
  var ajv = Ajv({allErrors: true})
  ajv.addSchema(carrierSchema)
  ajv.addSchema(contactSchema)
  ajv.addSchema(phoneSchema)
  ajv.addSchema(addressSchema)
  ajv.addSchema(accountSchema)
  
  return validateSchema(carrierSchema, ajv, {
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
        let { authorizedSignatory } = getIncludes(hook.app.get('database'))
        const {models: {phone}} = hook.app.get('database')
        authorizedSignatory.include = [{model: phone, as: 'phones', attributes: [ 'number' ], through: { attributes: [] }}]
        authorizedSignatory.attributes = ['name', 'email']
        hook.params.sequelize = {
          raw: false,
          include: [
            authorizedSignatory
          ],
          attributes: [ 'id', 'companyName', 'authorizedSignatoryId', 'createdAt' ]
        }
      }
    ],
    get: [
      function (hook) {
        hook.params.sequelize = {
          raw: false,
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
            carrier: carrierModel,
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
            }
        ]
        }
        
        carrierModel.findOne(filter).then(function (c) {          
          const { address, authorizedSignatory, account } = hook.data
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