const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid emial or password");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid emial or password");

    const token = user.generateAuthenticateToken();
    res
        .header("x-auth-token", token)
        .send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().required(),
        password: Joi.string().required(),
    };
    return Joi.validate(req, schema);
}

module.exports = router;