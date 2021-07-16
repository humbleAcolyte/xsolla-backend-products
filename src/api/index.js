const productsApi = require('./product')
const db = require('./model')

const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml')
const fs = require('fs')
let openapiDocument = null
try {
    openapiDocument = yaml.load(fs.readFileSync('./config/openapi.yaml', 'utf-8'))
} catch (error) {
    console.log('OpenAPI documentation not loaded')
}

const express = require('express')
const app = express()
const port = 3000

app.use('/api/v1/products', productsApi)
if (openapiDocument !== null) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument))
}

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err)
    }

    console.log('server is listening on port', port)
    db.start().catch()
})