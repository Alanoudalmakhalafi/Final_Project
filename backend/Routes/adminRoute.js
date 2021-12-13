const express = require("express")
const User = require("../models/user")
const Parking = require("../models/parking")
const Service = require("../models/Service")

const adminRouter = express.Router()

adminRouter.use(express.json())
// adminRouter.use(express.urlencoded({ extended: false }))

adminRouter.get("/admin", async (req, res) => {
  const admin = await User.find()
  res.send(admin)
})

adminRouter.put("/updateAdmin/:id", async (req, res) => {
  const updateAdmin = await User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
  res.send(updateAdmin)
})

adminRouter.delete("/deleteAdmin/:id", async (req, res) => {
  const deleteAdmin = await User.findOneAndRemove(req.params.id)
  res.send(deleteAdmin)
})

//PARKING STUFF

adminRouter.post("/addParking", async (req, res) => {
  const newParking = new Parking({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    numberOfParking: req.body.numberOfParking,
    image: req.body.image,
    price: req.body.price,
  })
  try {
    console.log("object")
    await newParking.save()
    
  } catch (error) { console.log(error) }

   Parking.find({})
   .then((parking)=>{
     res.send(parking)
   })
})

adminRouter.post("/addServices/:id", async (req, res) => {
  Parking.findById(req.params.id).then((parking)=>{
    Service.create({

      nameOfservice: req.body.nameOfservice,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,

    }).then(async(newService)=>{
      parking.services.push(newService) 
    try {
      await parking.save()
      res.send(newService)
    } catch (error) {
      res.send(error)
    }
      })
  })
})

module.exports = adminRouter
