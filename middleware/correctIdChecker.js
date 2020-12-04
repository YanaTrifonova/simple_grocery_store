async function correctIdChecker(req, res, next) {
    try {
        const id = req.params.id;

        if (!Number.isInteger(parseInt(id))) {
            return res.status(401).send("id is not a number");
        } else {
            next();
        }

    } catch (e) {
        next(e);
    }
}

module.exports = correctIdChecker;