const { validateGenre, Genre } = require("../models/genre");
const auth = require("../authentication/auth");
const admin = require("../authentication/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    let genre = await Genre.find();
    res.send(genre);
});
router.get("/:id", async (req, res) => {
    let genre = await Genre.findById(req.params.id);
    if (!genre)
        return res.status(400).send("No genre found with your given id.");
    res.send(genre);
});

router.post("/", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

router.put("/:id", [auth, admin], async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );
    if (!genre)
        return res
            .status(400)
            .send("Could not find any genre with the given id.");
    res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
    let genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre)
        return res
            .status(400)
            .send("Could not find any genre to delete by the given id");
    res.send(genre);
});

module.exports = router;
