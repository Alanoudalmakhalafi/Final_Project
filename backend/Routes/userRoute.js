const express = require("express");
const User = require("../models/user");
const Parking = require("../models/parking");
const booking = require("../models/booking");
const moment = require('moment-timezone');

const userRouter = express.Router();

userRouter.use(express.json());
// userRouter.use(express.urlencoded({extended: false}))

userRouter.get("/user", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

userRouter.put("/updateUser/:id", async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  res.send(updateUser);
});
userRouter.delete("/deleteUser/:id", async (req, res) => {
  const deleteUser = await User.findOneAndRemove(req.params.id);
  res.send(deleteUser);
});

userRouter.get("/allParking", async (req, res) => {
    const parkings = await Parking.find()
    res.send(parkings)
  })

userRouter.post("/userListOfParking", async (req,res)=>{
     let userId = req.body.id
     console.log(req.body.id);
     try{
         const userParking = await booking.find({"user":userId})
         .then((booking)=>{

             res.send(booking)
         })

     }catch(e){
         res.send(e)
     }
    
})

userRouter.put("/checkOut", async (req, res) => {
   
    await booking.findByIdAndUpdate( { _id: req.body.bookingId} , {
        endTime: moment().utcOffset(0, true).format(),
      }).then(async (updatedEndTime)=>{

           await updatedEndTime.save().then(async (savedEndTime)=>{
             console.log(savedEndTime)

             const parking = await Parking.findById(savedEndTime.parking)
         
             let end = savedEndTime.endTime.getUTCHours()
             let start = savedEndTime.startTime.getUTCHours()
             console.log("end "+end)
             console.log("start "+start)
         
             let timeSlot = (parseInt(end) - parseInt(start)) + 1
             console.log(timeSlot)
         
             const total = parking.price * timeSlot
             console.log(total)
         
              await booking.findByIdAndUpdate(req.body.bookingId, {
                 totalPrice: total,

               }).then(async (UpdatedPrice)=>{
                 await UpdatedPrice.save().then((savedPrice)=>{
                    res.send(savedPrice)
                })
               })
          })
      })
})

userRouter.post("/bookingParking", (req, res) => {
  Parking.findById(req.body.parking).then(async(parking) => {
    if (parking.numberOfParking > 0) {
        parking.numberOfParking --;
        await parking.save();
      booking
        .create({
          parking: req.body.parking,
          user: req.body.user,
          startTime: req.body.startTime,
        })
        .then(async (newBooking) => {
          try {
            await newBooking.save();
            res.send(newBooking);
          } catch (error) {
            res.send(error);
          }
        });
    } else {
      res.send("sorry parking is full");
    }
  });
});

module.exports = userRouter;
