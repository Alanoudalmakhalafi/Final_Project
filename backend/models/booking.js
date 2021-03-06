const mongoose = require('mongoose')
var Schema = mongoose.Schema
const moment = require('moment-timezone');

const timeZone = moment.tz.guess(true)
const KSAdate = moment().utcOffset(0, true).format()


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
    totalPrice:{
        type:Number,
    },
    date:{
        type:Date,
        default: KSAdate
    } ,
    IsChecked:{
        type:Boolean,
        
    }
})

const booking = mongoose.model('booking', bookingSchema)
module.exports = booking