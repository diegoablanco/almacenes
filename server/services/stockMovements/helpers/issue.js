const getDatabase = require('../../../database')
const getIssueIncludes = require('../includes')

module.exports =
  async ({ stock, date, carrierId, address, documents = [], images = [], transaction }) => {
    const { models: { address: addresses } } = getDatabase()
    const includes = getIssueIncludes(getDatabase())
    let addressId
    if (address) {
      const newAddress = await addresses.create(address)
      addressId = newAddress.id
    }
    await stock.createIssue({ date, carrierId, documents, images, addressId }, { include: [
      includes.documents,
      includes.images
    ],
    transaction,
    raw: false })
  }
