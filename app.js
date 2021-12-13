//import module
const express= require('express');
const app = express();
const port = 3000;
const flash = require('express-flash')
const session = require("express-session");

//middleware
const logger = (req, rest, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger)
app.use(express.static('public'));
app.use(session({
    secret: 'binarchallenge',
    resave: false,
    saveUninitialized: false
}))

const passport = require('./lib/passport');
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// set view engine menggunakan ejs
app.set('view engine', 'ejs')

// import router
const router = require('./router')
//const apiRouter = require('./api/router')
app.use(router)
//app.use(apiRouter)

//define users
var users = [
    {
        username: 'player',
        password: 'abc123'
    }
]


//webserver
app.listen(port, ()=>{
    console.log(`server berjalan di localhost: ${port}`)
})