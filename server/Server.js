const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT||3000
const userRouter = require("./router/User")

app.use(cors())
app.use(bodyParser.json())
app.use(express.json({urlencoded:true}))
app.use("/user",userRouter)


mongoose.connect(process.env.MONGO_URl)
    .then(()=>console.log("Database Connected"))
    .catch((err)=>console.log(err.message,"error"))
app.listen(PORT,()=>console.log(`Server started at port http://localhost:${PORT}`))