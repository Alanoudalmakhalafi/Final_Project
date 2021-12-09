const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'please enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter valid email']
    },
    password:{
        type: String,
        required: [true, 'please enter  password'],
        minlength: [6, 'minimum password length is 6 characters']
    },
    userType: {
        type: String,
        enum:['user','admin'],
        default: 'user'
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User