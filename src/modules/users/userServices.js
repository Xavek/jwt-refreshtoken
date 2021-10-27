
const refreshTokensList = {}
const Joi = require("joi")
const jwt = require("jsonwebtoken")

const schema = Joi.object({
    // fullName: Joi.string().max(30).required(),
    password:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    // phoneNumber:Joi.string().min(10).max(10).pattern(new RegExp('^[0-9]'))
})
// Validating the user Data
// Takes userdata from req.body and returns validated value => original data
function userValidator(userData){
    const {error,value} =schema.validate(userData)
    
    if (error){
        console.log(error)
        return (error.details[0].message)
    } else{
        return value
    }


}

function jwtSign(userEmail){

    const payload = {userEmail}
    const secret = process.env.JWT_SECRET_KEY 
    const token = jwt.sign(payload,secret,{expiresIn: process.env.tokenLife})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: process.env.refreshTokenLife})
    const response = {"token":token,"status":"Logged In", "refreshToken":refreshToken}
    refreshTokensList[refreshToken] = response
    return response
        

}

function jwtVerify(req,res,next){
    
    if(req.cookies.token){
        const token = req.cookies.token
        // const options = {expriesIn:process.env.tokenLife}
        

        try {
            const result = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.decoded = result
            next()
            
        } catch (error) {
            res.json("Invalid Token or Token expired")
            
            
        }
    } else {
        res.json("Token required")

    }

    res.status(401)


}

function refreshToken(usrData){
    console.log(usrData)
    console.log(refreshTokensList)
    if((usrData.refreshToken) &&(usrData.refreshToken in refreshTokensList)){
        const payload = usrData.email
        const newtoken = jwt.sign({payload:payload},process.env.JWT_SECRET_KEY, {expiresIn: process.env.tokenLife} )
        const response = {"newtoken":newtoken , "refreshToken":usrData.refreshToken}
        refreshTokensList[usrData.refreshToken].token = newtoken
        return response

    } else{
        return({response:"Invalid Request"})
    }

}


module.exports = {userValidator , jwtSign, jwtVerify, refreshToken}
