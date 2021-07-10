const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./api/index')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const errorHandler = (error, request, response, next) => {
    response.sendStatus(error.status || 500)
    console.log('Error status: ', error.status)
    console.log('Message: ', error.message)
}

app.post('/products', api.createProduct)
app.delete('/products/:id', api.deleteProductById)
app.delete('/products/sku/:sku', api.deleteProductBySku)

app.use(errorHandler)

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err)
    }

    console.log('server is listening on port', port)
    api.start().catch()
})