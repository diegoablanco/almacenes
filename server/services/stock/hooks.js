const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { validateSchema, setNow } = require('feathers-hooks-common')
const hydrate = require('feathers-sequelize/hooks/hydrate')
const dehydrate = require('feathers-sequelize/hooks/dehydrate')
const { Op } = require('sequelize')
const stockSchema = require('../../../common/validation/stock.json')
const stockBoxSchema = require('../../../common/validation/stockBox.json')
const stockPalletSchema = require('../../../common/validation/stockPallet.json')
const documentAttachmentSchema = require('../../../common/validation/documentAttachment.json')
const stockItemDetailSchema = require('../../../common/validation/stockItemDetail.json')
const stockServiceDetailSchema = require('../../../common/validation/stockService.json')
const errorReducer = require('../../helpers/errorReducer')
const createOrUpdateAssociations = require('../../models/helpers/createOrUpdateAssociations')
const { setMovement, setStatus, setGoodsDescription, getIncludes, setMovementServices, setLastMovementDate, expandChildren } = require('./helpers')
const { getFullStock, getStockForRelease, getStockForIssue } = require('./getHooks')
const { processSort } = require('../helpers')
const { setUser } = require('../hooks')


function validate() {
  const ajv = Ajv({ allErrors: true })
  ajv.addSchema(stockSchema)
  ajv.addSchema(stockBoxSchema)
  ajv.addSchema(stockPalletSchema)
  ajv.addSchema(documentAttachmentSchema)
  ajv.addSchema(stockItemDetailSchema)
  ajv.addSchema(stockServiceDetailSchema)
  return validateSchema(stockSchema, ajv, {
    addNewError: errorReducer
  })
}

function setInstructions(hook) {
  const { result, data: { instructions = [] } } = hook
  result.setInstructions(instructions.map(x => x.id))
}

module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [
      function (hook) {
        const { customer, targetCustomer, warehouse, status, stockBox, stockPallets, movements, children } = getIncludes(hook.app.get('database'))
        hook.params.sequelize = {
          raw: false,
          include: [customer, targetCustomer, warehouse, status, stockBox, stockPallets, movements, children],
          where: { parentId: {
            [Op.eq]: null
          } }
        }
        processSort(hook, { customer, targetCustomer, warehouse, status })
        const { params: { query: { $sort } } } = hook
        if ($sort) {
          const sortOrder = Object.values($sort)[0] === '1' ? 'ASC' : 'DESC'
          switch (Object.keys($sort)[0]) {
            case 'status':
              hook.params.sequelize.order = [[status, 'id', sortOrder]]
              break
            case 'id':
              hook.params.sequelize.order = [['createdAt', sortOrder]]
              break
            default:
              hook.params.sequelize.order = [['createdAt', 'desc']]
          }
          delete hook.params.query.$sort
        }
      }
    ],
    get: [
      function (hook) {
        const { params: { query: { movementType } } } = hook
        delete hook.params.query.movementType
        hook.params.movementType = movementType
        switch (movementType) {
          case 'preReceive':
          case 'receive':
          case 'edit':
            getFullStock(hook)
            break
          case 'issue':
            getStockForIssue(hook)
            break
          case 'release':
            getStockForRelease(hook)
            break
          default:
            break
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
      setNow('createdAt'),
      setUser('createdBy')
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
      },
      setUser('updatedBy')
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    create: [
      hydrate(),
      setInstructions,
      setMovement,
      setStatus
    ],
    find: [
      expandChildren,
      dehydrate(),
      context => {
        context.result.data = context.result.data.map(item => {
          delete item.children
          return item
        })
      },
      setGoodsDescription,
      setLastMovementDate
    ],
    get: [
      function (context) {
        if (context.result.dataValues.carrierId === null) { delete context.result.dataValues.carrierId }
      },
      dehydrate(), setMovementServices
    ],
    update: [
      hydrate(),
      setInstructions,
      setMovement,
      setStatus
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
