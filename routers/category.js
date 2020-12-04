const {Router} = require("express");
const router = new Router();

const Category = require('../models').category;

router.get('/categories', async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);

    } catch (e) {
        next(e);
    }
})

router.get('/categories/:id', async (req, res, next) => {
    try {
        const categoriesId = parseInt(req.params.id);
        const category = await Category.findByPk(categoriesId);
        res.json(category);

    } catch (e) {
        next(e);
    }
})

module.exports = router;