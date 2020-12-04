'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        static associate(models) {
            category.hasMany(models.product);
        }
    }

    category.init({
                      categoryName: {
                          type: DataTypes.STRING,
                          allowNull: false
                      },
                  }, {
                      sequelize,
                      modelName: 'category',
                  });
    return category;
};