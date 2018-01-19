const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { validateSchema, setNow } = require('feathers-hooks-common')
const hydrate = require('feathers-sequelize/hooks/hydrate')
const stockSchema = require('../../../common/validation/stock.json')
const stockBoxSchema = require('../../../common/validation/stockBox.json')
const stockPalletSchema = require('../../../common/validation/stockPallet.json')
const documentAttachmentSchema = require('../../../common/validation/documentAttachment.json')
const stockItemDetailSchema = require('../../../common/validation/stockItemDetail.json')
const errorReducer = require('../../helpers/errorReducer')
const createOrUpdateAssociations = require('../../models/helpers/createOrUpdateAssociations')

function validate() {
  const ajv = Ajv({ allErrors: true })
  ajv.addSchema(stockSchema)
  ajv.addSchema(stockBoxSchema)
  ajv.addSchema(stockPalletSchema)
  ajv.addSchema(documentAttachmentSchema)
  ajv.addSchema(stockItemDetailSchema)
  return validateSchema(stockSchema, ajv, {
    addNewError: errorReducer
  })
}
function getIncludes(database) {
  const {
    models: {
      customer,
      warehouse,
      carrier,
      warehouseInstruction,
      stockBox,
      stockPallets,
      documentAttachment,
      fileAttachment,
      stockItemDetail,
      stockService
    }
  } = database
  return {
    customer: {
      model: customer,
      attributes: ['companyName']
    },
    targetCustomer: {
      model: customer,
      as: 'targetCustomer',
      attributes: ['companyName']
    },
    billingCustomer: {
      model: customer,
      as: 'billingCustomer',
      attributes: ['companyName']
    },
    stockBox: {
      model: stockBox,
      as: 'boxes',
      include: [{ model: stockItemDetail, as: 'details' }]
    },
    stockPallets: {
      model: stockPallets,
      as: 'palets',
      include: [{ model: stockItemDetail, as: 'details' }]
    },
    warehouse: {
      model: warehouse
    },
    carrier: {
      model: carrier
    },
    warehouseInstruction: {
      model: warehouseInstruction,
      as: 'instructions',
      through: 'stock_instructions'
    },
    documents: {
      model: documentAttachment,
      as: 'documents',
      through: 'stock_documents'
    },
    images: {
      model: fileAttachment,
      as: 'images',
      through: 'stock_images'
    },
    services: {
      model: stockService,
      as: 'services'
    }
  }
}
module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [
      function (hook) {
        const { customer, targetCustomer, warehouse } = getIncludes(hook.app.get('database'))
        hook.params.sequelize = {
          raw: false,
          include: [customer, targetCustomer, warehouse]
        }
      }
    ],
    get: [
      function (hook) {
        const {
          customer,
          targetCustomer,
          billingCustomer,
          warehouse,
          carrier,
          warehouseInstruction,
          stockBox,
          stockPallets,
          documents,
          images,
          services } = getIncludes(hook.app.get('database'))
        const stockDetailIncludeSettings = {
          attributes: ['id', 'description', 'quantity', 'stockItemDetailTypeId'],
          through: { attributes: [] }
        }
        stockBox.include[0] = {
          ...stockBox.include[0],
          stockDetailIncludeSettings }
        stockPallets.include[0] = {
          ...stockPallets.include[0],
          stockDetailIncludeSettings }
        hook.params.sequelize = {
          raw: false,
          include: [
            { ...customer, attributes: ['id', 'companyName'] },
            { ...targetCustomer, attributes: ['id', 'companyName'] },
            { ...billingCustomer, attributes: ['id', 'companyName'] },
            { ...carrier, attributes: ['id', 'companyName'] },
            { ...warehouse, attributes: ['id', 'name'] },
            { ...warehouseInstruction, attributes: ['id'], through: { attributes: [] } },
            stockBox,
            stockPallets,
            documents,
            images,
            services
          ]
        }
      }
    ],
    create: [
      validate(),
      function (hook) {
        const { stockBox, stockPallets, documents, images, services } = getIncludes(hook.app.get('database'))
        hook.params.sequelize = {
          raw: false,
          include: [stockBox, stockPallets, documents, images, services]
        }
      },
      setNow('createdAt')
    ],
    update: [
      validate(),
      setNow('updatedAt'),
      function (hook) {
        const {
          models: {
            stock
          }
        } = hook.app.get('database')
        const { stockBox, stockPallets, documents, images, services } = getIncludes(hook.app.get('database'))
        const filter = {
          where: {
            id: hook.data.id
          },
          include: [stockBox, stockPallets, documents, images, services]
        }
        stock.findOne(filter).then(s => {
          s.set(hook.data)
          createOrUpdateAssociations(s, hook.data, s._options.include)
        })
      }
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    create: [
      hydrate(),
      function (hook) {
        const {
          result,
          data: {
            instructions = []
          } } = hook
        result.setInstructions(instructions.map(x => x.id))
      }
    ],
    find: [],
    get: [],
    update: [
      hydrate(),
      function (hook) {
        const { result, data: { instructions = [] } } = hook
        result.setInstructions(instructions.map(x => x.id))
      }
    ],
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
}
