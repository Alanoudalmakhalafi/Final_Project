const express = require("express");
const User = require("../models/user");
const Parking = require("../models/parking");
const Service = require("../models/Service");

const adminRouter = express.Router();

adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: false }));

adminRouter.get("/admin", async (req, res) => {
  const admin = await User.find();
  res.send(admin);
});

adminRouter.put("/updateAdmin/:id", async (req, res) => {
  const updateAdmin = await User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  res.send(updateAdmin);
});

adminRouter.delete("/deleteAdmin/:id", async (req, res) => {
  const deleteAdmin = await User.findOneAndRemove(req.params.id);
  res.send(deleteAdmin);
});

//PARKING STUFF

adminRouter.post("/addParking", async (req, res) => {
  const newParking = new Parking({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    numberOfParking: req.body.numberOfParking,
    image: req.body.image,
  });
  newParking.save();
  const parking = Parking.find();
  res.send(parking);
});

adminRouter.post("/addServices/:id", async (req, res) => {
  const parkingId = await Parking.findById(req.params.id);
  const newService = new Service({
    nameOfservice: req.body.nameOfservice,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  });
  parkingId.services.push(newService);
  try {
    await parkingId.save();
    res.status(201).send(parkingId);
  } catch (error) {
    console.log(error);
  }
});

module.exports = adminRouter;
