const routes = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
routes.post('/register',async(req,res)=>{
    try {
        // console.log(req.body)
        const {first_name,last_name,email,password} = req.body
        
        const hash = await bcrypt.hash(password,10)
        await User.create({
            first_name,last_name,email,password:hash
        }).then((res)=>console.log(res))
        return res.json({
            status:"Success",
            message:"Registration Completed"
        })
        
    } catch (error) {
        if(error.code === 11000){
            return res.status(401).json({
                status:"error",
                message:"User already exist!"
            })
        }
        throw Error(error.message)
        
    }
})
routes.post('/login',async(req,res)=>{
    try {
        // console.log(req.body)
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(user){
           const orgPassword = await bcrypt.compare(password,user.password)
           if(orgPassword){
               const token = await jwt.sign({id:user._id},process.env.jwtKey)
               if(token){
                console.log(token)
                   return res.json({
                        token
                    })
               }
           }
           return res.status(403).json({
            status:"error",
            message:"Invalid Credential!!"
        })
        }
        return res.status(403).json({
            status:"error",
            message:"Invalid Credential!!"
        })
    } catch (error) {
        throw Error(error)
    }
})

module.exports = routes