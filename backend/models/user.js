const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const md5 = require("md5")

const userSchema = new mongoose.Schema({
    phone:{
        type:Number,
    },
    email:{
        type: String,
        required: [true, 'please enter email'],
        unique: true,
        validate: [isEmail, 'please enter valid email']
    },
    password:{
        type: String,
        required: [true, 'please enter  password'],
        minlength: [6, 'minimum password length is 6 characters'],
        lowercase: [true,'pls lowercase '],

    },
    userType: {
        type: String,
        enum:['user','admin'],
        default: 'user'
    }
})

//fire function after doc saved to db
userSchema.post('save', function(doc,next){
    console.log('new user was created &saved',doc)
    next()
})

// before

// userSchema.pre('save', async function (next){
//     const salt = await bcrypt.genSalt()
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })

userSchema.statics.login = async function(email,password){//

  const user = await this.findOne({email})  
  if(email !==""){

      if(user){
          const md5Pass = await md5(password)
          if(md5Pass === user.password){
              return user
            }
            throw Error('incorrect password')
        }
        throw Error ('incorrect email')
    } throw Error ("Email required")
}


const User = mongoose.model('user', userSchema)
module.exports = User