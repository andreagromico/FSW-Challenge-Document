const router = require('express').Router()
//const apiRouter = require('./api/router')
const { page, auth } = require('./controllers')

router.get('/', page.home);
router.post('/article', page.create)
router.get('/article/create', page.vCreate)
router.get('/dashboard', page.dashboard)
router.get("/edit/:id", page.edit);
router.post("/update/:id", page.edit);
router.get('/delete/:id', page.edit)

router.get('/register', page.register)
router.post('/register', auth.register)
router.get('/login', page.login)
router.post('/login', auth.login)

router.get('/game', page.game)
router.get("/playerlogin", page.playerlogin);
router.get("/single", page.single);
router.get("/versus", page.versus);


module.exports = router;