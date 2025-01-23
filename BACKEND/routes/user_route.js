const express = require('express');
const { createuser, upload } = require('../controllers/usercontroller.js'); // Import both createuser and upload

const router = express.Router();

router.post("/create", createuser);

router.post('/upload', upload.single('profilePic'), (req, res) => {
    res.send('File uploaded successfully!');
});

module.exports = router;
