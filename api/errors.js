const createError = require('http-errors')

function productNotFound (field, value) {
    return createError(400, 'Product with '+field+' '+value+' not found.')
}

function badUser () {
    return createError(400, 'Bad request.')
}

function dbError () {
    return createError(500, 'Product can\'t be created.')
}

module.exports = {
    productNotFound,
    badUser,
    dbError
}