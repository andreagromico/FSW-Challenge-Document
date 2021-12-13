const router = require('express').Router()
const {page} = require('../../controllers')

router.get('/', page.index)

module.exports = router