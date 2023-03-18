const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    cart:[String]
})

const User = mongoose.model("User",userSchema)

module.exports = User