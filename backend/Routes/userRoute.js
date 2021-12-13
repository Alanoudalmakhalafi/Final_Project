const express = require("express");
const User = require("../models/user");
const Parking = require("../models/parking");
const booking = require("../models/booking");

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
