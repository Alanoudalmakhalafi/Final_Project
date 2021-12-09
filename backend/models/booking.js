const mongoose = require('mongoose')
var Schema = mongoose.Schema

const bookingSchema = new mongoose.Schema({
    parking:{
        type:Schema.Types.ObjectId,
       ref:'Parking',
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    startTime:{
        type:Date,
    },
    endTime:{
        type:Date,
    },
    price:{
        type:Number,
    },
    date:{
        type:Date,
    }
})

const booking = mongoose.model('booking', bookingSchema)
module.exports = booking