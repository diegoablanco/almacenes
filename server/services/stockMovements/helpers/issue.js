const getDatabase = require('../../../database')
const getIssueIncludes = require('../includes')
const setStatusByCode = require('./setStatusByCode')
const createDerivedStock = require('./createDerivedStock')
const reduceUnitsByReferences = require('./reduceUnitsByReferences')

module.exports =
  async ({
    stock,
    issueType,
    references,
    date,
    carrierId,
    address,
    documents = [],
    images = [],
    transaction
  }) => {
    const { models: { address: addresses } } = getDatabase()
    const includes = getIssueIncludes(getDatabase())
    let addressId
    if (address) {
      const newAddress = await addresses.create(address)
      addressId = newAddress.id
    }

    const referencesToIssue = references
      .filter(({ issueQuantity }) => issueQuantity && issueQuantity > 0)
      .map(({
        id: referenceId,
        reference,
        issueQuantity }) => ({
        id: referenceId,
        reference,
        quantity: issueQuantity
      }))
    await stock.createIssue(
      {
        date,
        carrierId,
        documents,
        images,
        addressId,
        references: referencesToIssue.map(({ reference, quantity }) => ({ reference, quantity }))
      },
      {
        include: [
          includes.documents,
          includes.images
        ],
        transaction,
        raw: false
      }
    )
    if (issueType === 'partial') {
      const newStock = await createDerivedStock({
        stockId: stock.id,
        references: referencesToIssue,
        transaction
      })
      await setStatusByCode(newStock, 'fulfilled', transaction)
    }

    await reduceUnitsByReferences(stock, referencesToIssue, transaction)
  }
