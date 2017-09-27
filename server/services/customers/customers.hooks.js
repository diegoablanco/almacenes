const auth = require('feathers-authentication').hooks;
const Ajv = require('ajv')
const commonHooks = require('feathers-hooks-common');
const {
  validateSchema,
  setCreatedAt,
  setUpdatedAt
} = commonHooks;
const schema = require('../../../common/validation/customer')()
const constactSchema = require('../../../common/validation/contact')()
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
      }, {
        model: contact,
        as: 'authorizedSignatory',
        include: [phone]
      }, {
        model: contact,
        as: 'authorizedPerson',
        include: [phone]
      },
    ]
  }
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
            account
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
            as: 'authorizedSignatory'
          }]
        }
      }
    ],
    create: [
      validateSchema(schema, Ajv, {
        addNewError: errorReducer
      }),
      setCreatedAt(),
      addIncludes
    ],
    update: [
      validateSchema(schema, Ajv, {
        addNewError: errorReducer
      }),
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
              include: [phone]
            }, 
            {
              model: contact,
              as: 'authorizedPerson',
              include: [phone]
            }
        ]
        }
        customer.findOne(filter).then(function (c) {
          if(c.address)
            c.address.updateAttributes(hook.data.address)
          if (c.authorizedSignatory)
            c.authorizedSignatory.updateAttributes(hook.data.authorizedSignatory)
          else {
            const ajv = Ajv({
              allErrors: true
            })
            const validate = ajv.compile(constactSchema)
            if (validate(hook.data.authorizedSignatory))
              contact.create(hook.data.authorizedSignatory).then(authorizedSignatory => c.setAuthorizedSignatory(authorizedSignatory))
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
    get: [],
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