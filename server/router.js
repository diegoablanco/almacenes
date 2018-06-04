const express = require('@feathersjs/express')
const { client: { defaultRoute } } = require('config')
const { serveHtmlForEnvironment } = require('./helpers')

const router = express.Router()

router.get('/', serveHtmlForEnvironment)
router.use('/user', serveHtmlForEnvironment)
router.use('/user/signup', serveHtmlForEnvironment)
router.use('/customers', serveHtmlForEnvironment)
router.use('/warehouses', serveHtmlForEnvironment)
router.use('/services', serveHtmlForEnvironment)
router.use('/carriers', serveHtmlForEnvironment)
router.use('/stock', serveHtmlForEnvironment)
router.use('/products', serveHtmlForEnvironment)
router.use('/stockAccountMovements', serveHtmlForEnvironment)
router.use(defaultRoute, serveHtmlForEnvironment)

module.exports = router
