const mongoose = require('mongoose')
const express = require('express')
const userRouter = require('./Routes/userRoute')
const adminRouter = require('./Routes/adminRoute')
const authRoutes = require('./Routes/authRoute')
const cors = require('cors')
const stripe = require("stripe")(
  "sk_test_51KG1ymCh49zQHfRHdQKGKg994Hfan2sDrZqVUAKbsdq2YuRhVJBD5mWXPDMlth3oYaBrBpzRg3sw1EjIcsySc0s700zoEXKwEc"
)

const app = express()

app.use(cors())
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use(authRoutes)

app.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

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