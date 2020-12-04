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

        const newOrder = await Order.create({
            userId: USERID,
            categoryName: category.categoryName,
            productName: product.productName,
            numberOfItems: product.numberOfItems,
            price: product.price,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        const updatedProduct = await Product.update(
            {numberOfItems: product.numberOfItems - count}, {where: {id: product.id}}
        );

        res.send(updatedProduct);
        res.send(newOrder);

    } catch (e) {
        next(e);
    }
})

module.exports = router;