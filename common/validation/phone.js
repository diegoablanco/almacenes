module.exports = function () {
  return ({
    id: "http://xarxa.com/schemas/phone#",
    title: "Phone",
    description: "A phone number",
    type: ["object"],
    properties: {
      number: {
        type: "string",
      },
      type: {
        type: "object"
      }
    },
    required: ["number", "type"]
  })
}