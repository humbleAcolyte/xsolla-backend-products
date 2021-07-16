const model = require('./model')
const seqConf = require('./config/sequelize')

const createProduct = (async (request, response, next) => {
    const {sku, name, type, price} = request.body
    let id
    try {
        id = await model.createProduct(sku, name, type, price)
    } catch (error) {
        next (error)
        return
    }
    response.status(201).send(JSON.stringify({id: id}), null, '\t')
})

const getProductById = (async (request, response, next) => {
    const id = request.params.id
    try {
        request.product = await model.findProductById(id)
    } catch (error) {
        next(error)
    }
    next()
})

const getProductBySku = (async (request, response, next) => {
    const sku = request.params.sku
    try {
        request.product = await model.findProductBySku(sku)
    } catch (error) {
        next(error)
    }
    next()
})

const getOneProduct = (async (request, response, next) => {
    const product = request.product
    response.send(JSON.stringify(product, seqConf.exportFields, '\t'))
})

const getAllProducts = (async (request, response, next) => {
    let sort = request.query.sort
    if (sort !== undefined) {
        sort = sort.split(' ')
    } else {
        sort = []
    }

    let page = request.query.page
    if (page === undefined) {
        page = 1
    }

    let products
    try {
        products = await model.getAllProducts(sort, page, seqConf.pageLimit)
    } catch (error) {
        next(error)
        return
    }
    response.status(200).send(JSON.stringify(products, seqConf.exportFields, '\t'))
})

const changeProduct = (async (request, response, next) => {
    const product = request.product
    const {sku, name, type, price} = request.body

    let params = []
    try {
        if (sku !== undefined) {
            product.sku = sku
            params.push('sku')
        }
        if (name !== undefined) {
            product.name = name
            params.push('name')
        }
        if (type !== undefined) {
            product.type = type
            params.push('type')
        }
        if (price !== undefined) {
            product.price = price
            params.push('price')
        }
        await product.save({ fields: params })
    } catch (error) {
        next (error)
        return
    }
    response.sendStatus(200)
})

const deleteProduct = (async (request, response, next) => {
    const product = request.product
    try {
        await product.destroy()
    } catch (error) {
        next(error)
        return
    }
    response.sendStatus(200)
})

const errorHandler = (error, request, response, next) => {
    response.sendStatus(error.status || 500)
    console.log('Error status: ', error.status)
    console.log('Message: ', error.message)
}

module.exports = {
    start: model.start,
    getProductById,
    getProductBySku,
    createProduct,
    getOneProduct,
    getAllProducts,
    changeProduct,
    deleteProduct,
    errorHandler
}