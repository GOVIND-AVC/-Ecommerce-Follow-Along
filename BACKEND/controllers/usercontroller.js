const mongoose = require('mongoose');
const userModel = require('../model/user.model.js').userModel; // Correctly import userModel

const bcrypt = require('bcrypt'); // Import bcrypt

const createuser = async (req, res) => {
    try {
        let payload = req.body;
        const hashedPassword = await bcrypt.hash(payload.password, 10); // Hash the password
        payload.password = hashedPassword;// Replace plain password with hashed password
        try {
            let newUser = new userModel(payload);
            await newUser.save();
            res.status(200).send(newUser);

        } catch (error) {
            res.status(500).send({"error": error.message}); // Improved error handling
        }
    } catch {
        console.log("error");
    }
}

const userlogin = async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existinguser  =  await userModel.findOne({email});
        if(!existinguser){
            return res.status(400).send({"error":"user doesnot exist"})
        }
        const validpassword = await bcrypt.compare(password,existinguser.password);
        if(!validpassword){
            return res.status(400).send({"error":"invalid credintials"})
        }
        // if(!existinguser || existinguser.password !== password){
        //     return res.status(400).send({"error": "Invalid credentials"});
        // }
        res.status(200).json({message:'login successful'});
    } catch(error){
        console.error("Login error:", error); // Log the error details
        res.status(500).json({
            message:'Server error, please try later'
        });
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

module.exports = { createuser, upload, userlogin }; // Export the upload variable
