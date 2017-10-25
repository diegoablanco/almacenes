module.exports = function () {
  return ({
    id: "http://xarxa.com/schemas/address#",
    title: "Address",
    description: "An address",
    type: ["object"],
    properties: {
      line1: {
        type: "string",
      },
      zipCode: {
        type: "string"
      },
      city: {
        type: "string"
      },
      country: {
        type: "string"
      }
    },
    required: ["line1", "zipCode", "city", "country"]
  })
}