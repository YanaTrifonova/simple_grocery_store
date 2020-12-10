const {Router} = require('express');
const {toJWT} = require('../authorization/jwt');
const bcrypt = require("bcrypt");

const router = new Router();

const User = require("../models").user;

router.post('/auth/login', async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        if (!email) {
            return res.status(400).send("Please supply a valid email");
        }
        if (!password) {
            return res.status(400).send("Please supply a valid password");
        }

        const user = await User.findOne({where: {email: email}});

        if (bcrypt.compareSync(password, user.password)) {
            res.send({jwt: toJWT({userId: user.id})});
        } else {
            res.status(400).send({message: "Password was incorrect"});
        }
    } catch (e) {
        next(e);
    }
})

module.exports = router