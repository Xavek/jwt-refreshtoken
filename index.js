require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const app = express()

app.use(helmet())
// This must be used while developing SPA with different ports
// app.use(cors({origin: 'localhost:3000', credentials:true}))
app.use(cors())
app.use(express.json())

// app.use(express.urlencoded({extends:false}))
app.use(cookieParser())

const PORT = process.env.PORT
const usrRoutes = require("./src/modules/users/userRoutes")

app.get("/",(req,res)=>{
    res.json({alive: true})
    
})
app.use("/user", usrRoutes)


app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`)
})




