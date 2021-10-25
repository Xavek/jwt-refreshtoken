const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
require("dotenv").config()
const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())

// app.use(express.urlencoded({extends:false}))
app.use(express.json())

const PORT = process.env.PORT
const usrRoutes = require("./src/modules/users/userRoutes")

app.get("/",(req,res)=>{
    res.json({alive: true})
    
})
app.use("/user", usrRoutes)


app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`)
})




