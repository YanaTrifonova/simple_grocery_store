'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        static associate(models) {
            product.belongsTo(models.category)
        }
    }

    product.init({
                     categoryId: {
                         type: DataTypes.INTEGER,
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
                     modelName: 'product',
                 });
    return product;
};