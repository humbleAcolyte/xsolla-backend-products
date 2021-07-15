const {Sequelize, DataTypes, Op} = require('sequelize')
const pgConf = require('./config/postgress')
const seqConf = require('./config/sequelize')
const errors = require('./errors')
const sequelize = new Sequelize(pgConf.database, pgConf.user, pgConf.password, {
    host: pgConf.host,
    dialect: 'postgres'
})

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
    tableName: pgConf.database
})

let sortMap = new Map()

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
        throw errors.dbCreateError()
    }
    return id
}

async function getAllProducts(sort, page) {
    let order = []
    sort.forEach(elem => {
        const param = sortMap.get(elem)
        if (param === undefined) {
            throw errors.badUser()
        }
        order.push(param)
    })

    const offset = (page - 1) * seqConf.pageLimit
    if (offset < 0) {
        throw errors.badUser()
    }

    try {
        return await Product.findAll({
            order: order,
            limit: seqConf.pageLimit,
            offset: offset
        })
    } catch (error) {
        throw errors.dbError()
    }
}

async function findProductById(id) {
    if (id === undefined) {
        throw errors.badUser()
    }

    const product = await Product.findByPk(id)
    if (product === null) {
        throw errors.productNotFound('id', id)
    }
    return product
}

async function findProductBySku(sku) {
    if (sku === undefined) {
        throw errors.badUser()
    }

    const product = await Product.findOne({
        where: {
            sku: {
                [Op.eq]: sku
            }
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
        await Product.sync({alter: true})
        console.log('Table products has been successfully synchronised')
    } catch (error) {
        console.log('Unable to synchronise the products table. Remove connection with the database.')
        await sequelize.close()
    }

    sortMap.set('type', ['type', 'ASC'])
    sortMap.set('type_desc', ['type', 'DESC'])
    sortMap.set('price', ['price', 'ASC'])
    sortMap.set('price_desc', ['price', 'DESC'])
}

module.exports = {
    start,
    createProduct,
    findProductById,
    findProductBySku,
    getAllProducts,
}

