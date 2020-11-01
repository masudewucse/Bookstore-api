
const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

const Genre = mongoose.model('genres', genreSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;


