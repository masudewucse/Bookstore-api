const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

let bookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    autor: {
        type: String,
        minlength: 3,
        maxlength: 225,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },
    inStock: {
        type: Number,
        min: 0,
    },
});

const Book = mongoose.model("books", bookSchema);

function validateBook(book) {
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        autor: Joi.string().min(3).max(255).required(),
        genre: Joi.objectId().required(),
        price: Joi.number().min(0).required(),
        inStock: Joi.number().min(0).required(),
    };
    return Joi.validate(book, schema);
}

exports.validateBook = validateBook;
exports.bookSchema = bookSchema;
exports.Book = Book;