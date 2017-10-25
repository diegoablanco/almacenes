const contactSchema = require('./contact')()
const accountSchema = require('./account')()
const addressSchema = require('./address')()
module.exports = function () {
  return ({
    "id": "http://xarxa.com/schemas/customer#",
    "title": "Warehouse customer",
    "description": "A warehouse customer",
    "type": "object",
    "properties": {
      "companyName": {
        "type": "string"
      },
      "authorizedSignatory": {type: ["object", "null"], "$ref": "contact#"},
      "account": {type: ["object", "null"], "$ref": "account#"},
      "address": {type: ["object", "null"], "$ref": "address#"},
    },
    "required": ["companyName"]
  })
}