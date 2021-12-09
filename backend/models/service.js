const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    nameOfservice:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type: String
    },
    price:{
        type:Number
    }
})

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service
