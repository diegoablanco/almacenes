const contactSchema = require('./contact')()
module.exports = function () {
  return ({
    type: ["object"],
    properties: {
      bankName: {
        type: "string",
      },
      number: {
        type: "string"
      },
      authorizedPerson: Object.assign(contactSchema, {type: ["object", "null"]})
    },
    required: ["bankName", "number"]
  })
}