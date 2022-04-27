const { DataTypes, Model } = require('sequelize');

const moment = require('moment')
const createdAt = {
    type: DataTypes.DATE,
    get () { return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') }
}
module.exports.user = function (sequelize) {

    class user extends Model { }
    user.init(
        {
            username: { type: DataTypes.STRING, allowNull: true, defaultValue: '123456' },
            password: { type: DataTypes.STRING, allowNull: true, defaultValue: '123456' },
            createdAt: createdAt
        }, { sequelize, modelName: 'user' })

};



module.exports.classify = function (sequelize) {

    class classify extends Model { }
    classify.init(
        {
            name: { type: DataTypes.STRING, allowNull: true },
            sort: { type: DataTypes.INTEGER, allowNull: true },
            status: { type: DataTypes.STRING, allowNull: true, defaultValue: 'ON', },
            createdAt: createdAt,
        }, { sequelize, modelName: 'classify', tableName: 'classifys' })
};


module.exports.goods = function (sequelize) {

    class good
        extends Model { }
    good.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            status: { type: DataTypes.STRING, allowNull: true, defaultValue: 'ON', },
            price: { type: DataTypes.DOUBLE(11, 2), allowNull: false, defaultValue: 1 },
            sort: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
            max: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1000 },
            min: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
            describe: { type: DataTypes.STRING(8000), allowNull: true, },
            img: { type: DataTypes.STRING, allowNull: true, },
            createdAt: createdAt,
            // sale: { type: DataTypes.STRING(8000), allowNull: true, },
        }, { sequelize, modelName: 'good' })

};

module.exports.card = function (sequelize) {

    class card
        extends Model { }
    card.init(
        {
            number: { type: DataTypes.STRING, allowNull: false },
            is_sell: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
            is_used: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
            type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            createdAt: createdAt
        }, { sequelize, modelName: 'card' })

};

module.exports.order = function (sequelize) {

    class order
        extends Model { }
    order.init(
        {
            name: { type: DataTypes.STRING, allowNull: true, },
            count: { type: DataTypes.INTEGER, allowNull: true, },
            sendCardStatus: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
            contact: { type: DataTypes.STRING, allowNull: true, },
            payNo: { type: DataTypes.STRING, allowNull: true, },
            payMode: { type: DataTypes.INTEGER, allowNull: true, },
            orderPrice: {
                type: DataTypes.DOUBLE(11, 2), allowNull: true, defaultValue: 0, validate: { min: 0.01 }
            },
            real_price: {
                type: DataTypes.DOUBLE(11, 2), allowNull: true, defaultValue: 0, validate: {}
            },
            status: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0, },
            ip: { type: DataTypes.STRING, allowNull: true, },
            pay_id: { type: DataTypes.STRING, allowNull: true, },
            goodId: { type: DataTypes.INTEGER, allowNull: false, },
            createdAt: createdAt
        }, { sequelize, modelName: 'order' })

};

