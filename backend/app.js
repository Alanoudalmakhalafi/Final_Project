const mongoose = require('mongoose')
const express = require('express')
const userRouter = require('./Routes/userRoute')
const adminRouter = require('./Routes/adminRoute')
const authRoutes = require('./Routes/authRoute')
const multer = require("multer")
const path = require("path")
require('dotenv/config')
var fs = require('fs')
var bodyParser = require('body-parser')
const cors = require('cors')
var imgModel = require('./models/parking')

const app = express()

app.use(cors())
// app.use("/image", express.static(path.join(__dirname, "/image")))
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use(authRoutes)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// Set EJS as templating engine 
app.set("view engine", "ejs")

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    //cb(null, req.body.name)
  }
});
var upload = multer({ storage: storage })

// Step 7 - the GET request handler that provides the HTML UI

app.get('/', (req, res) => {
	imgModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('imagesPage', { items: items });
		}
	});
});

// Step 8 - the POST handler for processing the uploaded file

app.post('/', upload.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	imgModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});

// Step 9 - configure the server's port

var port = process.env.PORT || '3000'
app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})

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