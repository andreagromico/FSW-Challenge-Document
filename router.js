const router = require('express').Router()
const router = require('./api/router')
const { page, auth } = require('./controllers')

router.get('/', page.index);
router.post('/article', users.create)
router.get('/article/create', users.vCreate)
router.get('/articles', page.dashboard)
router.get("/edit/:id", page.edit);
router.post("/update/:id", page.edit);
router.get('/delete/:id', page.edit)

router.get('/register', page.vRegister)
router.post('/register', auth.register)
router.get('/login', page.vLogin)
router.post('/login', auth.login)

router.get('/game', page.game)



module.exports = router;