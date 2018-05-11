const fs = require('fs')
const config = require('config')
const path = require('path')


module.exports = async function (filename) {
  const { uploads: { path: uploadsPath } } = config
  const { name, ext } = path.parse(filename)
  const imagePath = `${uploadsPath}\\${name}_thumb${ext}`
  const imageFile = await fs.readFileSync(imagePath, 'binary')
  return Buffer.from(imageFile, 'binary').toString('base64')
}
