const config = require('config')
const multer = require('multer')
const blobService = require('feathers-blob')
const fs = require('fs-blob-store')
const hooks = require('./hooks')

const multipartMiddleware = multer()
const { uploads: { path } } = config
// feathers-blob service
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const blobStorage = fs(path)

module.exports = function () {
  const app = this

  const servicePath = `${config.apiPath}/upload`

  app.use(
    servicePath,
    // multer parses the file named 'uri'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('uri'),

    // another middleware, this time to
    // transfer the received file to feathers
    (req, res, next) => {
      req.feathers.file = req.file;
      next();
    },
    blobService({ Model: blobStorage })
  )

  const service = app.service(servicePath)
  service.hooks(hooks)
}
