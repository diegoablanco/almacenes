const contactSchema = require('./contact')()
module.exports = function () {
  return ({
    id: "http://xarxa.com/schemas/account#",
    title: "Customer account",
    description: "A customer account",
    type: ["object"],
    properties: {
      bankName: {
        type: "string",
      },
      number: {
        type: "string"
      },
      authorizedPerson: {type: ["object", "null"], "$ref": "contact#"}
    },
    required: ["bankName", "number"]
  })
}