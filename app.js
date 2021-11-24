//import module
const express= require('express');
const app = express();
const port = 3000;

// import model database
const { User } = require('./models')
const { Profile } = require('./models');

// set view engine menggunakan ejs
app.set('view engine', 'ejs')

//middleware
const logger = (req, rest, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger)
app.use(express.static('public'));

// import router
const router = require('./router')
app.use(router)

//define users
var users = [
    {
        username: 'player',
        password: 'abc123'
    }
]

//login procedure
app.post('/login', (req, res) => {
    const {username, password} = req.body
    let Player = users.find(user => user.username === username)
    let Password = users.find(user => user.password === password)
    console.log(Player)
    if (Player) {
        res.redirect('/dashboard')
    }
    else {
        res.json("Incorrect Login")
    }
})


app.get('/dashboard', (req, res) => {
    User.findAll()
    .then(users => {
    res.render('dashboard', {
    users
    })
    })
})



//create
app.post('/create', (req, res) => {
    User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
    })

    .then(user => {
        res.redirect('/dashboard')
    })
   
})





//update
app.post('/update/:id', (req, res) => {
    User.update({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
    }, {
    where: { id: req.params.id }
    })
    .then(user => {
        res.render('edit', {
            user
        })
    })
})

//delete
app.get('/delete/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
        })
        .then(user => {
            res.redirect('/dashboard')
        })
})


// pick and select one
app.get('/update/:id', (req, res) => {
    User.findOne({
    where: { id: req.params.id }
    })
    .then(user => {
    
    res.redirect('/dashboard')
    })
})

app.get('/edit/:id', (req, res) => {
    User.findOne({
    where: { id: req.params.id }
    })
    .then(user => {
    // res.status(200).json(user)
    res.render('/edit', {
        user
        })
    })
})

//errorHandler
app.use((err, req, res, next) => {
    console.log(`error: ${err}`)
    res.status(500).json({
        status: "fail",
        message: err.message
    })
})
app.use((req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `${req.url} 404 not found`
    })
    next()
})





//webserver
app.listen(port, ()=>{
    console.log(`server berjalan di localhost: ${port}`)
})