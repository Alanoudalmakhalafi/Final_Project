const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err) =>{
    console.log(err.message, err.code)
    let errors = {email:'', password:''}

    if(err.message === 'incorrect email'){
        errors.email ='email not register'
    }

    if(err.message === 'incorrect password'){
        errors.password ='password incorrect'
    }

    //duplicationn error code
    if (err.code === 11000){
        errors.email = 'email is already registered'
        return errors
    }

     //valdation errors
    if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
        console.log(properties)
        errors[properties.path] = properties.message
    })
    }
    return errors;
}

const maxAge = 3*24*60*60
//سوينا توكن
const createToken = (id,userType) => {
    return jwt.sign({id,userType},'alanoud secret',{
       expiresIn: maxAge
    })
}


// SIGN UP POST
module.exports.signup_post = async (req, res) => {
    const { email, password ,userType} = req.body
    
    try {
    const user = await User.create({email, password,userType})
    const token = createToken(user._id, user.userType)
    res.cookie('jwt',token,{httpOnly: true, maxAge:maxAge*1000})
     res.status(201).json({user:user,token:token})//
    } 
    catch (err) {
        const errors = handleErrors(err)
        console.log(errors)
        res.status(400).json({errors})
    }
}

// LOGIN POST 
module.exports.login_post = async  (req, res) => {
    const { email, password,userType } = req.body
   try {
       const user = await User.login(email, password,userType) 
       const token = createToken(user._id, user.userType)
       res.cookie('jwt',token,{httpOnly: true, maxAge:maxAge*1000}) 
       res.status(200).json({user:user,token:token})//
   } 
   catch (error) {
     const errors = handleErrors(error)  
     res.status(200).json({errors})  
   }
}

// LOGOUT GET
module.exports.logout_get = (req, res) => {//
    res.cookie('jwt', '',{maxAge:1})
    res.redirect('/')
}