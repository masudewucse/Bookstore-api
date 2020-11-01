const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); // its a function
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

const users = require("./routes/users");
const genres = require("./routes/genres");
const books = require("./routes/books");
const auth = require("./routes/auth");



const port = process.env.PORT || 4000
const db = process.env.DATABASE_URI_live;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb database connection is successful!"))
    .catch((err) => console.log("Could not connect to MongoDB database! sorry!", err));


app.use(express.json());
app.use('/user', users);
app.use('/genre', genres);
app.use('/book', books);
app.use('/auth', auth);



app.listen(port, () => {
    console.log(`The project is running for port ${port}`);
});