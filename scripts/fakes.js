const faker = require('faker')
faker.locale = 'es'
function createCustomer(){
  return {
    companyName: faker.company.companyName(),
    address: createAddress(),
    authorizedSignatory: createContact(),
    account: createAccount(),
    authorizedPersons: [
      createContact()
    ]
  }
}
function createAddress(){
    const { address } = faker
    return {
      line1: address.streetAddress(),
      line2: address.secondaryAddress(),
      zipCode: address.zipCode(),
      city: address.city(),
      country: address.country()
    }
}
function createContact(){
    const { name, internet, number } = faker
    return {
      name: name.findName(),
      position: name.jobType(),
      email: internet.email(),
      phones: [
        createPhone()
      ]
    }
}
function createPhone(){
    const { phone } = faker
    return {
          typeId: 1,
          number: phone.phoneNumber()
        }
}
function createAccount(){
    const { finance } = faker
    return {
      bankName: finance.accountName(),
      number: finance.account(),
      iban: finance.iban(),
      swiftBic: finance.bic(),
      address: createAddress(),
      authorizedPerson: [createContact()]
    }
}
function createCarrier(){
    const { companyName, address, account, authorizedSignatory } = createCustomer()
    return {
      companyName,
      address,
      account,
      authorizedSignatory
    }
}
function createService(){
    const { finance, random } = faker
    return {
      description: random.words(),
      rate: finance.amount()
    }
}
function createWarehouse(){
    const { company, internet, phone } = faker
    return {
      name: company.companyName(),
      email: internet.email(),
      phone: phone.phoneNumber()
    }
}
function createWarehouseInstruction(){
    const { lorem } = faker
    return {
      description: lorem.paragraph()
    }
}
module.exports = {
    createCustomer: createCustomer,
    createAddress,
    createContact,
    createPhone,
    createAccount,
    createCarrier,
    createService,
    createWarehouse,
    createWarehouseInstruction
}