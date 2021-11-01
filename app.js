//import module
const express= require('express');
const app = express();
const port = 3000;

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
var user = [
    {
        email: 'user@mail.com',
        password: 'abc123'
    }
]

//login procedure
app.post('/login', (req, res) => {
    const {email, password} = req.body
    let userEmail = user.find(user => user.email === email)
    let userPassword = user.find(user => user.password === password)
    console.log(userEmail)
    if (userEmail) {
        res.json(userEmail)
    }
    else {
        res.json("Incorrect Login")
    }
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