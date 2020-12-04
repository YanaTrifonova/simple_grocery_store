const {Router} = require("express");
const router = new Router();

const Order = require('../models').order;
const Category = require('../models').category;
const Product = require('../models').product;

//Fake Id const before we create an auth for new user
const USERID = 1;

router.post('/orders/', async (req, res, next) => {
    try {
        const productId = req.body.productId;
        const count = req.body.count;

        const product = await Product.findOne({where: {id: productId}});

        if (!product) return res.status(400).send("no product was found");
        if (product.numberOfItems <= count) return res.status(404)
                                                      .send("it is not enough items of good you want to order");

        const category = await Category.findOne({where: {id: product.categoryId}});
        const categoryName = category.categoryName;
        const productName = product.productName;
        const numberOfItems = product.numberOfItems;
        const price = product.price;
        const createdAt = Date.now();
        const updatedAt = Date.now();

        const newOrder = await Order.create({
            userId: USERID,
            categoryName: categoryName,
            productName: productName,
            numberOfItems: numberOfItems,
            price: price,
            createdAt: createdAt,
            updatedAt: updatedAt
        });

        res.send(newOrder);

    } catch (e) {
        next(e);
    }
})

module.exports = router;