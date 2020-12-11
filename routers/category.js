const {Router} = require("express");
const router = new Router();

const Category = require('../models').category;
const Product = require('../models').product;
const correctIdChecker = require('../middlewares/correctIdChecker');

router.get('/categories', async (req, res, next) => {
    try {
        const categories = await Category.findAll();

        if (!categories) return res.status(404).send("no categories were found");

        res.json(categories);

    } catch (e) {
        next(e);
    }
})

router.get('/categories/:id', correctIdChecker, async (req, res, next) => {
    try {
        const categoryId = parseInt(req.params.id);
        const category = await Category.findByPk(categoryId);

        if (!category) return res.status(404).send("this category id not found");

        res.json(category);

    } catch (e) {
        next(e);
    }
})

router.get('/categories/:id/products', correctIdChecker, async (req, res, next) => {
    try {
        const categoryId = parseInt(req.params.id);
        const category = await Product.findAll({where: {categoryId: categoryId}});

        if (!category) return res.status(404).send("products with this category id not found");

        res.json(category);

    } catch (e) {
        next(e);
    }
})

module.exports = router;