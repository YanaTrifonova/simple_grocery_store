const {Router} = require("express");
const router = new Router();

const Order = require('../models').order;
const Category = require('../models').category;
const Product = require('../models').product;

const correctIdChecker = require('../middlewares/correctIdChecker');

//Fake Id const before we create an auth for new user
const USERID = 1;

router.post('/orders', async (req, res, next) => {
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

router.get('/orders', async (req, res, next) => {
    try {
        const orders = await Order.findAll();
        if (!orders) return res.status(404).send("no orders were found")

        let total = 0;
        console.log("------------------------------Your order-----------------------------");
        orders.forEach((order, index) => {
            let data = order.dataValues;
            let totalItemPrice = data.price * data.numberOfItems;
            console.log(
                `${index}: ${data.numberOfItems} items of ${data.productName} for the price of ${data.price}$ each in total ${totalItemPrice}$`);
            total = total + totalItemPrice;
        });
        console.log("----------------------Your total order is", total, "$----------------------");

        res.json(orders);
    } catch (e) {
        next(e);
    }
})

router.get('/orders/:id', correctIdChecker, async (req, res, next) => {
    try {
        const orderId = parseInt(req.params.id);
        const order = await Order.findByPk(orderId);

        if (!order) return res.status(404).send("this order id not found");

        res.json(order);
    } catch (e) {
        next(e);
    }
})

router.delete('/orders/:id', correctIdChecker, async (req, res, next) => {
    try {
        const orderId = parseInt(req.params.id);
        const toDelete = await Order.findByPk(orderId);

        if (!toDelete) {
            return res.status(404).send(`Order with id:${orderId} not found`);
        }
        const deleted = await toDelete.destroy();
        res.json(deleted);

    } catch (e) {
        next(e);
    }
})

router.delete('/orders/users/:userId', async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId);
        const toDelete = await Order.findAll({where: {userId: userId}});

        console.log(toDelete);

        if (!toDelete) {
            return res.status(404).send(`Order of the user with id:${userId} not found`);
        }

        for (const item of toDelete) {
            await item.destroy();
        }

        next();

    } catch (e) {
        next(e);
    }
})

module.exports = router;