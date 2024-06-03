const express = require("express");
const router = express.Router();
const {registerUser,loginUser, currentUser} = require("../controllers/userController.js");
const validateToken = require("../middlewares/validateToken.js");

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/user').get(validateToken,currentUser);


module.exports = router;