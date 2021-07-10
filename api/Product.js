/* TODO
   1. Move config file
   2. Create http errors
 */

const {Sequelize, DataTypes, Op} = require('sequelize')
const pstgrs_conf = require('../config')
const sequelize = new Sequelize(pstgrs_conf.database, pstgrs_conf.user, pstgrs_conf.password, {
    host: pstgrs_conf.host,
    dialect: 'postgres'
})
const errors = require('./Errors')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sku: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: pstgrs_conf.database
})

async function createProduct(sku, name, type, price) {
    let id
    try {
        const product = await Product.create({
            sku: sku,
            name: name,
            type: type,
            price: price
        })
        id = product.id
    } catch (error) {
        console.log('Could not create this product in database:', error)
        id = null
    }
    return id
}

async function deleteProductById(id) {
    try {
        const product = await findProductById(id)
        await product.destroy()
    } catch (error) {
        throw error
    }
}

async function deleteProductBySku(sku) {
    try {
        const product = await findProductBySku(sku)
        await product.destroy()
    } catch (error) {
        throw error
    }
}

async function findProductById(id) {
    const product = await Product.findByPk(id)
    if (product === null) {
        throw errors.productNotFound('id', id)
    }
    return product
}

async function findProductBySku(sku) {
    const product = await Product.findOne({
        where: {
            sku: sku
        }
    })
    if (product === null) {
        throw errors.productNotFound('SKU', sku)
    }
    return product
}

async function start() {
    try {
        await sequelize.authenticate()
        console.log('Connection to database has been established successfully.')
    } catch (error) {
        console.log('Unable to connect to the database:', error)
        return
    }
    try {
        await Product.sync({force: true})
        console.log('Table products has been successfully synchronised')
    } catch (error) {
        console.log('Unable to synchronise the products table. Remove connection with the database.')
        await sequelize.close()
    }
}

module.exports = {
    start,
    createProduct,
    deleteProductById,
    deleteProductBySku
}

