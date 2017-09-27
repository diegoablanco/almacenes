const phoneSchema = require('./phone')()
module.exports = function () {
  return ({
    type: ["object"],
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email"
      },
      phones: {
        type: ["array", "null"],
        items: Object.assign(phoneSchema, {type: ["object", "null"]})
      }
    },
    required: ["name"]
  })
}