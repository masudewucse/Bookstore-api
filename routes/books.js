const { Genre } = require("../models/genre");
const { validateBook, Book, bookSchema } = require("../models/book");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../authentication/auth");
const admin = require("../authentication/admin");

router.get("/", async (req, res) => {
    let course = await Book.find();
    res.send(course);
});

router.get("/:id", async (req, res) => {
    let book = await Book.findById(req.params.id);
    if (!book)
        return res.status(400).send("No course has been found by your given id.");

    res.send(book);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    // Authentication of the user is admin..
    // Middleware functions
    // parameters: router, middleware (optional), router handler

    const { error } = validateBook(req.body);
    //console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genre);
    if (!genre)
        return res.status(400).send("No genre found with your given id");

    let book = new Book({
        name: req.body.name,
        autor: req.body.autor,
        genre: {
            _id: genre.id,
            name: genre.name,
        },
        price: req.body.price,
        inStock: req.body.inStock,
    });
    console.log(book);
    book = await book.save();
    res.send(book);
});

router.put("/:id", [auth, admin], async (req, res) => {
    let genre = await Genre.findById(req.body.genre);
    if (!genre) return res.status(400).send("Genre id is invalid!");

    let { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let book = await Book.findByIdAndUpdate(
        req.params.id, {
        name: req.body.name,
        autor: req.body.autor,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        price: req.body.price,
        inStock: req.body.inStock,
    }, { new: true }
    );

    if (!book)
        return res.status(404).send("The Book with the given ID is not found!");
    res.send(book);
});

router.delete("/:id", [auth, admin], async (req, res) => {
    let book = await Book.findByIdAndDelete(req.params.id);
    if (!book)
        return res.status(404).send("The course with the given ID is not found");

    res.send(book);
});

module.exports = router;