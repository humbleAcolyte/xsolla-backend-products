const Product = require('./Product')

const createProduct = (async (request, response, next) => {
    const {sku, name, type, price} = request.body
    let id = await Product.createProduct(sku, name, type, price)
    if (id === null) {
        response.sendStatus(400)
        return
    }
    response.sendStatus(201).send(id)
})

const deleteProductById = (async (request, response, next) => {
    const id = request.params.id
    try {
        await Product.deleteProductById(id)
    } catch (error) {
        next(error)
    }
    response.sendStatus(200)
})

const deleteProductBySku = (async (request, response, next) => {
    const sku = request.body.sku
    try {
        await Product.deleteProductBySku(sku)
    } catch (error) {
        next(error)
    }
    response.sendStatus(200)
})

module.exports = {
    start: Product.start,
    createProduct,
    deleteProductById,
    deleteProductBySku
}





