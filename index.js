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

app.post('/products', api.createProduct)
app.get('/products', api.readProducts, api.jsonConvert)
app.get('/products/item', api.readProduct, api.jsonConvert)
app.put('/products', api.updateProduct)
app.delete('/products/item', api.deleteProduct)

app.use(api.errorHandler)

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err)
    }

    console.log('server is listening on port', port)
    api.start().catch()
})