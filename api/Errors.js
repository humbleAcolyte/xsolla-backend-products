const createError = require('http-errors')

function productNotFound (field, value) {
    return createError(400, 'Product with '+field+': '+value+' not found')
}

function dataBase () {

}

module.exports = {
    productNotFound
}