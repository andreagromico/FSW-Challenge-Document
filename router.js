const express = require('express')
const router = express.Router()

router.use(express.static('public'));
router.get('/', (req,res) =>{
    res.render('index')
});

router.get('/game', (req,res) =>{
    res.render('game')
});

router.get('/login', (req, res) => {
    res.render('login')
})

// router.get('/dashboard', (req,res) =>{
//     res.render('dashboard')
// });




module.exports = router;