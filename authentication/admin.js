module.exports = function (req, res, next) {
    // 401 aunauthorized
    //403 Forbidden
    console.log(req.user);
    if (!req.user.isAdmin) {
        console.log('Access deined');
        res.status(403).send("Access Denied");
    }

    next();
};