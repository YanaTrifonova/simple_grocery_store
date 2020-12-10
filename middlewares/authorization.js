const User = require("../models").user;
const {toData} = require("../authorization/jwt");

async function auth(req, res, next) {
    const {authorization} = req.headers
    if (!authorization) return res.send('no authorization')

    const [bearer, token] = authorization.split(' ');
    console.log("bearer", bearer);
    console.log("token", token);

    if (!bearer) return res.status(401).send("bad credentials. no bearer");
    if (!token) return res.status(401).send("bad credentials. no token");

    try {
        const data = toData(token);
        const user = await User.findByPk(data.userId);

        if (!user) return res.status(404).send("user not found");

        req.user = user;
        next();

    } catch (e) {
        next(e);
    }
}

module.exports = auth;