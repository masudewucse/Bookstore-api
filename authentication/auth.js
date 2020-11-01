const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied! no Administrator token provided");

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid Administrator token");
    }
}

module.exports = auth;