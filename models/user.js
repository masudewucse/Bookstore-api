const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    email: {
        type: String,
        minlength: 3,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: Boolean,
});

userSchema.methods.generateAuthenticateToken = function () {
    console.log(this);
    const token = jwt.sign({ _id: this._id, email: this.email, isAdmin: this.isAdmin },
        process.env.JWT_TOKEN
    );
    return token;
};

const User = mongoose.model("users", userSchema);

function userValidation(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.userValidation = userValidation;