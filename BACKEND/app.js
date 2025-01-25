const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config(); // Import dotenv to use environment variables

const user_route = require('./routes/user_route.js'); // Updated import path

const userModel = require('./model/user.model'); // Import the user model

const cors = require('cors')

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/', user_route);

let connection = mongoose.connect("mongodb+srv://eemail2govind:govind100@brucecluster0.3j1xf.mongodb.net/?retryWrites=true&w=majority&appName=BRUCECluster0"); // Use environment variable for MongoDB connection

app.get('/ping', (req, res) => {
    res.send("pong");
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
