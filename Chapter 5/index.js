// import modul yang dibutuhkan
const express = require('express')
const app = express();
const port = 3000;

// set view engine menggunakan ejs
app.set('view engine', 'ejs')

//middleware
const logger = (req, rest, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger)

//router
const router = require('./router')
app.use(router)

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


//setiap GET request ke http://localhost:3000/ akan diarahkan ke handler ini
app.get('/', (req, res) => {
    res.send("Hello World")
})

//setiap GET request ke http://localhost:3000/products akan diarahkan ke handler ini
app.get('/products', (req, res) => {
    res.json([
        "Apple",
        "Redmi",
        "One Plus One"
    ])
})

//setiap GET request ke http://localhost:3000/products akan diarahkan ke handler ini
app.get('/orders', (req, res) => {
    res.json([
        {
            id: 1,
            paid: false,
            user_id: 1
        },
        {
            id: 2,
            paid: false,
            user_id: 1
        }
    ])
})


//webserver
app.listen(port, () => console.log(`server berjalan di localhost: ${port}`))