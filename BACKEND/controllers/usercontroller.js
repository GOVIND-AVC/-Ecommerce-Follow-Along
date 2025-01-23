const userModel = require('../model/user.model.js');

const createuser = async (req, res) => {
    try {
        let payload = req.body;
        try {
            let newUser = new userModel.userModel(payload);
            await newUser.save();
            res.status(200).send(newUser);
        } catch (error) {
            res.status(500).send({"error": error.message}); // Improved error handling
        }
    } catch {
        console.log("error");
    }
}

const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory to save the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = { createuser, upload }; // Export the upload variable
