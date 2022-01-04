const express = require("express");
const User = require("../models/user");
const Parking = require("../models/parking");
const booking = require("../models/booking");
const moment = require('moment-timezone')
const bcrypt = require('bcrypt')

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
userRouter.put("/updatePassword/:id", async (req, res) => {
  let newPass = req.body.NewPassword
  const user = await User.findById(req.params.id)
  console.log(user)
  const auth = await bcrypt.compare(req.body.password, user.password)
  console.log(auth)
  let salt = await bcrypt.genSalt()
  console.log(user.password)
  console.log(await bcrypt.hash(req.body.password, salt))
  newPass = await bcrypt.hash(newPass, salt)

  if(auth){
    const after = await User.findByIdAndUpdate(req.params.id,{ password:req.body.NewPassword})
    res.send(after);
  }

})
userRouter.delete("/deleteUser/:id", async (req, res) => {
  const deleteUser = await User.findByAndRemove(req.params.id);
  res.send(deleteUser);
});

userRouter.get("/allParking", async (req, res) => {
    const parkings = await Parking.find().populate('services')//
    res.send(parkings)
  })

userRouter.post("/userListOfParking", async (req,res)=>{
     let userId = req.body.id
     console.log(req.body.id);
     try{
         const userParking = await booking.find({"user":userId}).populate('parking')
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

           await updatedEndTime.save()
           booking.findById({_id:req.body.bookingId}).then(async (savedEndTime)=>{
             console.log("saved ", savedEndTime) 

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
                 IsChecked:true,

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
