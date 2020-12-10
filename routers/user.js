const {Router} = require("express");
const router = new Router();
const User = require('../models').user;
const bcrypt = require("bcrypt");

const authMiddleware = require("../middlewares/authorization");

router.get("/user/all", authMiddleware, async (req, res, next) => {
    try {
        const users = await User.findAll();
        if (!users) {
            return res.status(404).send("Users not found");
        }
        res.json(users);
    } catch (e) {
        next(e);
    }
})

router.post("/user/add", async (req, res, next) => {
    try {
        const {
            email,
            password,
            userName,
        } = req.body;
        if (!email) return res.status(400).send("missing email parameter");
        if (!password) return res.status(400).send("missing password parameter");
        if (!userName) return res.status(400).send("missing name parameter");

        /**
         * Small work around to add a user with admin role:
         * check if userName start with a number set a role = admin
         * else set a role = user
         */

        let role;
        if (!isNaN(userName.charAt(0))) {
            role = "admin";
        } else {
            role = "user";
        }

        const newUser = await User.create({
            email: email,
            password: bcrypt.hashSync(password, 10),
            userName: userName,
            role: role,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        console.log("newUser", newUser);

        res.json(newUser);

    } catch (e) {
        next(e);
    }
});

module.exports = router;