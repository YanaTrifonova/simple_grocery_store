'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class order extends Model {
        static associate(models) {
            order.belongsTo(models.user)
        }
    }

    order.init({
                   userId: {
                       type: DataTypes.INTEGER,
                   },
                   categoryName: {
                       type: DataTypes.STRING,
                       allowNull: false
                   },
                   productName: {
                       type: DataTypes.STRING,
                       allowNull: false
                   },
                   numberOfItems: {
                       type: DataTypes.INTEGER,
                       allowNull: false
                   },
                   price: {
                       type: DataTypes.INTEGER,
                       allowNull: false
                   },
               }, {
                   sequelize,
                   modelName: 'order',
               });
    return order;
};