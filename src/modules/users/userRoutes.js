const express = require("express")

const router = express.Router()
const {userValidator , jwtSign ,jwtVerify, refreshToken}= require("./userServices")
// Register route would hit here.
// User data would be validate using joi validator
// then saved 
router.post("/register",(req,res)=>{
    if(req.body.email !== undefined){
        const value = userValidator(req.body)
        const result = jwtSign(req.body.email)
        console.log(value)
        res.status(200).json(result)
        } else{
        res.json("Register Error: Please Check Input Fields")
    }
  
    
})
router.get("/", jwtVerify,(req,res)=>{
    res.json("Hello")
})
router.post("/token", (req,res)=>{
    const response = refreshToken(req.body)
    console.log(response)
    res.status(200).json(response)
    
})
router.get("/aftergregister", jwtVerify,(req,res)=>{
    res.json("You Sucessfully registered.")
})

module.exports = router