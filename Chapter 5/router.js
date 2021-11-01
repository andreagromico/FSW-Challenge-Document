const express = require('express')
const router = express.Router()
var user = []
let posts = require('./posts.json')

/*
router.get('/', (req, res,) =>{
    const data = {
        name: 'Andre',
        age: 31
    }
    res.render('index', {
        data
    })
})
*/

router.get('/', (req, res) => {
    const data = `jumlah user ada ${user.length}`
    res.render('register')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    console.log(req.body)
    const {email, password = req.body}
    user.push({email, password})
    res.redirect('/')
})

router.get('/game', (req, res) => {

})

//router-api
router.get('/api/posts', (req, res) => {
    res.status(200).json(posts)
})

router.get('/api/posts/:id', (req, res) => {
    const id = req.params.id
    const post = posts.find(i => i.id === + id)
    res.status(200).json(post)
})

router.post('/api/posts', (req,res) => {
    const {title,body} = req.body
    const id = post[post.length - 1].id + 1
    const post = {
        id: id,
        title: title,
        body: body
    }
    post.push(post)
    res.status(201).json(post)
})

router.put('api/post/:id', (req, res) => {
    const id =req.params.id
    let post = post.find(i => i.id === + id)
    const param = {
        title : req.body.title,
        body : req.body.body
    }
    post = {...post, ...param}
    posts = posts.map(i = i.id === post.id ? post: i)
    res.status(201).json(post)
})

router.delete('/api/posts/:id', (req, res) => {

})

module.exports = router;