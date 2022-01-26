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
        res.cookie(`token`,`${result.token}`, {httpOnly:true})
        res.cookie("refreshToken", result.refreshToken,{httpOnly:true})
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
    res.cookie(`token`,`${response.newtoken}`,{httpOnly:true, secure:true, sameSite: "lax"})
    res.cookie("refreshToken", response.refreshToken,{httpOnly:true})
    res.status(200).json(response)
    
})
router.get("/isregister", jwtVerify,(req,res)=>{
    res.json("Yes You Are Already registered")
})

module.exports = router