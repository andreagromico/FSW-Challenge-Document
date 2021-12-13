const router = require ('express').Router()
const page = require ('./pageRouter')

router.use('./api/index', page)
//router.use('./api/user')

module.exports = router