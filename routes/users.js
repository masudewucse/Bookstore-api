const _ = require("lodash"); // return properties filtering 
const jwt = require("jsonwebtoken"); // tokenized password creator
const bcrypt = require("bcrypt");
const { User, userValidation } = require("../models/user");
const express = require("express");
const router = express.Router();

const auth = require("../authentication/auth");
const admin = require("../authentication/admin");


// Get the current user
/*
router.get("/masud", async (req, res) => {
    const user = await User.findById(req.user._id).select("-password"); // from json web token
    res.send(user);
});
*/

router.get("/", async (req, res) => {
    const users = await User.find().select('-password');
    res.send(users);
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(400).send("user id is not valid!");
    res.send(user);
});

router.delete("/:id", [auth, admin], async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(400).send("user id is not valid!");

    res.send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/:id", [auth, admin], async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("User id is not found!");

    let { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    let userObj = await User.findByIdAndUpdate(
        req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: password
    }
    );


    if (!userObj)
        return res.status(404).send("The User with the given ID is not found!");
    res.send(userObj);
});



router.post("/", async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).send("Email is already exist!");

    const user = new User(
        _.pick(req.body, ["name", "email", "password"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthenticateToken();
    //console.log("x-auth-token", token);
    res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;