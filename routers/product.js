const {Router} = require("express");
const router = new Router();

const Product = require('../models').product;
const correctIdChecker = require('../middlewares/correctIdChecker');

router.get('/products', correctIdChecker, async (req, res, next) => {
    try {
        const products = await Product.findAll();

        if (!products) return res.status(404).send("no products were found")

        res.json(products);

    } catch (e) {
        next(e);
    }
})

router.get('/products/:id', correctIdChecker, async (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await Product.findByPk(productId);

        if (!product) return res.status(404).send("this product id not found");

        res.json(product);

    } catch (e) {
        next(e);
    }
})

module.exports = router;