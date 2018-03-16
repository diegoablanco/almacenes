module.exports = function (database) {
  const {
    models: {
      contact,
      phone,
      address,
      account,
      documentAttachment
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
    },
    authorizedPersons: {
      model: contact,
      as: 'authorizedPersons',
      through: 'customer_contacts',
      include: [{ model: phone, as: 'phones' }]
    },
    documents: {
      model: documentAttachment,
      as: 'documents',
      through: 'customer_documents'
    }
  }
}
