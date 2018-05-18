const { getBase64String } = require('../../uploads/helpers')

module.exports = function (hook) {
  (hook.result.images || []).forEach(async image => {
    image.thumb = await getBase64String(image.hashName)
  })
}
