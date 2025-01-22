const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Import dotenv to use environment variables

const userModel = require('./model/user.model'); // Import the user model

const app = express();
const port = 8000;

app.use(express.json());

let connection = mongoose.connect(process.env.MONGODB_URI); // Use environment variable for MongoDB connection

app.get('/ping', (req, res) => {
    res.send("pong");
});

app.post("/create", async (req, res) => {
    let payload = req.body;

    try {
        let newUser = new userModel.userModel(payload);

        await newUser.save();
        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send({"error": error.message}); // Improved error handling
    }
});

app.listen(port, async () => {
    try {
        await connection;
        console.log("connected successfully");
    } catch (error) {
        console.log("Connection error:", error); // Improved connection error handling
    }
    console.log(`server running on port ${port}`);
});
