const mongoose = require("mongoose");
var Schema = mongoose.Schema


const parkingSchema = new mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  numberOfParking: {
    type: Number,
  },
  image:  {
    data: Buffer,
    contentType: String
},
  price:{
    type:Number,
  },
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }]
});

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;
