module.exports = function getIncludes(database) {
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
      include: [{ model: phone,
        as: 'phones'
      }]
    },
    authorizedPersons: {
      model: contact,
      as: 'authorizedPersons',
      through: 'customer_contacts',
      include: [{ model: phone, as: 'phones' }]
    }
  }
}
