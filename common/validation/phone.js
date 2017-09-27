module.exports = function () {
  return ({
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