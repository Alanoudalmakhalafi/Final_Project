const mongoose = require('mongoose')
const express = require('express')
const userRouter = require('./Routes/userRoute')
const adminRouter = require('./Routes/adminRoute')

const app = express()

app.use('/user', userRouter)
app.use('/admin', adminRouter)


const uri = 'mongodb+srv://alanoud:1418@cluster0.anylu.mongodb.net/parkingSite?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
 useUnifiedTopology: true
});

const connection = mongoose.connection
connection.once('open', () => console.log('Connected to DB'),
connection.on('disconnected', () => console.log('mongo disconnected')),
connection.on('error', err => { console.log('connection error', err) }))


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}/`)
})