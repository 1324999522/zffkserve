const { Sequelize, Op } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sequelize/database.sqlite',
    logging: false,
})
global.sequelize = sequelize
const Models = require('./models')
for (let key in Models) {
    Models[key](sequelize)
}

// 测试数据库连接是否正常
const testConnet = async function () {
    try {
        await sequelize.authenticate()
        // await sequelize.sync({ alter: true })
        return true
    } catch (error) {
        console.log('数据库链接失败，' + error)
        return false
    }
}
testConnet()

const { order, good, classify, card } = sequelize.models

good.belongsTo(classify)
card.belongsTo(good)
card.belongsTo(order)



module.exports = {
    models: sequelize.models,
    testConnet,
    sequelize,
    Op
}



