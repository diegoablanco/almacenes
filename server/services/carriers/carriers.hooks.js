const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { validateSchema, setNow } = require('feathers-hooks-common')
const carrierSchema = require('../../../common/validation/carrier.json')
const contactSchema = require('../../../common/validation/contact.json')
const phoneSchema = require('../../../common/validation/phone.json')
const addressSchema = require('../../../common/validation/address.json')
const accountSchema = require('../../../common/validation/account.json')
const errorReducer = require('../../helpers/errorReducer')
const createOrUpdateAssociations = require('../../models/helpers/createOrUpdateAssociations')
const { processSort } = require('../helpers')

function getIncludes(database) {
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
      include: [{ model: phone, as: 'phones' }]
    }
  }
}

function addIncludes(hook) {
  const { account, address, authorizedSignatory } = getIncludes(hook.app.get('database'))
  hook.params.sequelize = hook.params.sequelize || {}
  hook.params.sequelize.include = [account, address, authorizedSignatory]
}

function validate() {
  const ajv = Ajv({ allErrors: true })
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
        const { authorizedSignatory } = getIncludes(hook.app.get('database'))
        const { models: { phone } } = hook.app.get('database')
        authorizedSignatory.include = [{ model: phone, as: 'phones', attributes: ['number'], through: { attributes: [] } }]
        authorizedSignatory.attributes = ['name', 'email']
        hook.params.sequelize = {
          subQuery: false,
          include: [
            { ...authorizedSignatory, attributes: ['name', 'email'], include: [] }
          ],
          attributes: ['id', 'companyName', 'authorizedSignatoryId', 'createdAt']
        }
        processSort(hook, { authorizedSignatory })
      }
    ],
    get: [
      function (hook) {
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
      function updateIncludes(hook) {
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
            include: [{ model: phoneModel, as: 'phones', through: 'contact_phones' }]
          }
          ]
        }

        carrierModel.findOne(filter).then((c) => {
          c.set(hook.data)
          createOrUpdateAssociations(
            c,
            hook.data,
            c._options.include // eslint-disable-line no-underscore-dangle
          )
        })
      }],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [
      function (context) {
        if (context.result.dataValues.address === null) { delete context.result.dataValues.address }
        if (context.result.dataValues.authorizedSignatory === null) {
          delete context.result.dataValues.authorizedSignatory
        }
        if (context.result.dataValues.account === null) { delete context.result.dataValues.account }
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
