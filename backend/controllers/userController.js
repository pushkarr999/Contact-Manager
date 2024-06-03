const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
//@desc Login User
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req,res) => { 
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email:email})
    if(user){
        if(await bcrypt.compare(password, user.password)){
            const accessToken = jwt.sign({
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, "bittu@123", {expiresIn: "10000m"})
            res.status(200).json({accessToken})
        }
        else{
            res.status(400);
            throw new Error("Incorrect password")
        }
    }
    else{
        res.status(400);
        throw new Error("user does not exist")
    }
    res.status(200).json({message:`User Logged in`})
})

//@desc Register User
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req,res) => {
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email:email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({_id:user.id, email: user.email})
    }
    res.status(200).json({message:`User Registered`})
})

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });

module.exports = {registerUser,loginUser, currentUser}