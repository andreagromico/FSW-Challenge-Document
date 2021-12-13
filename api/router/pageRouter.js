const router = require('express').Router()
const {page, auth} = require('../../controllers')

router.get('/', page.index)

module.exports = router