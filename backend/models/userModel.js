const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add username"]
    },
    email:{
        type: String,
        required: [true, "Please add email"],
        unique: [true, "Email already taken"]
    },
    password:{
        type: String,
        required: [true, "Please add password"]
    },
},{
    timestamps: true
});

module.exports = mongoose.model("User",userSchema);