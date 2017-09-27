const contactSchema = require('./contact')()
const accountSchema = require('./account')()
module.exports = function () {
  return ({
    "type": "object",
    "properties": {
      "companyName": {
        "type": "string"
      },
      "authorizedSignatory": Object.assign(contactSchema, {type: ["object", "null"]}),
      "account": Object.assign(accountSchema, {type: ["object", "null"]}),
    },
    "required": ["companyName"]
  })
}