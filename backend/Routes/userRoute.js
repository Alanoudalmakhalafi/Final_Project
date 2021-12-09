const express = require('express')
const User = require('../models/user')

const userRouter = express.Router()

userRouter.use(express.json())
userRouter.use(express.urlencoded({extended: false}))

userRouter.get('/user', async (req,res)=>{
    const user = await User.find()
    res.send(user)
})

userRouter.put('/updateUser/:id', async (req,res)=>{
    const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
    res.send(updateUser)
})
userRouter.delete('/deleteUser/:id', async (req,res)=>{
    const deleteUser = await User.findOneAndRemove(req.params.id)
    res.send(deleteUser)
})

module.exports = userRouter