const Product = require('./product')
const seqConf = require('./config/sequelize')

const createProduct = (async (request, response, next) => {
    const {sku, name, type, price} = request.body
    let id
    try {
        id = await Product.createProduct(sku, name, type, price)
    } catch (error) {
        next (error)
        return
    }
    response.status(201).send(id.toString())
})

const readProduct = (async (request, response, next) => {
    const id = request.query.id
    let product
    try {
        if (id !== undefined) {
            product = await Product.findProductById(id)
        }
        else {
            const sku = request.query.sku
            product = await Product.findProductBySku(sku)
        }
    } catch (error) {
        next(error)
        return
    }
    request.json = product
    next()
})

const readProducts = (async (request, response, next) => {
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
        products = await Product.getAllProducts(sort, page)
    } catch (error) {
        next(error)
        return
    }
    request.json = products
    next()
})

const updateProduct = (async (request, response, next) => {
    const {id, sku, name, type, price} = request.body
    let product
    try {
        if (id !== undefined) {
            product = await Product.findProductById(id)
        }
        else {
            product = await Product.findProductBySku(sku)
        }
    } catch (error) {
        next(error)
        return
    }

    let params = []
    try {
        // if (sku !== undefined) {
        //     product.sku = sku
        //     params.push('sku')
        // }
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
    const id = request.query.id
    let product
    try {
        if (id !== undefined) {
            product = await Product.findProductById(id)
        }
        else {
            const sku = request.query.sku
            product = await Product.findProductBySku(sku)
        }
        await product.destroy()
    } catch (error) {
        next(error)
        return
    }
    response.sendStatus(200)
})

const jsonConvert = (async (request, response, next) => {
    const json = JSON.stringify(request.json, seqConf.exportFields, '\t')
    response.status(200).send(json)
})

const errorHandler = (error, request, response, next) => {
    response.sendStatus(error.status || 500)
    console.log('Error status: ', error.status)
    console.log('Message: ', error.message)
}

module.exports = {
    start: Product.start,
    errorHandler,
    createProduct,
    readProduct,
    readProducts,
    updateProduct,
    deleteProduct,
    jsonConvert
}





