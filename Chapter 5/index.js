const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => res.send('Hello World!'))


//ROUTER
//setiap GET request ke localhost 3000/product akan diaeahkan ke handler ini
app.get('/products', (req, res) => {
    res.json([
        "Apple",
        "Redmi",
        "One Plus One"
    ])
})

//setiap GET request ke localhost 3000/order akan diarahkan ke handler ini
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
        },
        
    ])
})

//MIDDLEWARE
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    nest ()
}

app.use(logger)

app.listen(port, () => console.log(`Server berjalan di localhost: ${port}`))