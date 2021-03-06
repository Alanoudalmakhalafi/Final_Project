# Final_Project

## Description

## User Stories

- **Signup:** As a user I can sign up in the platform so that I can start playing into competition
- **Login:** As a user I can login to the platform so that I can log my exit points
- **Logout:** As a user I can logout from the platform so no one else can use it

## Backlog

- payment method
- earning point with every reservation

# Client / Frontend

## React Router Routes (React App)

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | Home                 | public `<Route>`           | Home page, sidebar                                           |
| `/Signup&Login`  | SignUp_LogIn         | public `<Route>`           | Login form, link to signup, navigate to homepage after login |
| `/Profile`  | Profile              | user only `<PrivateRoute>` | User information form and update button                      |
| `/AddNewParking` | AddParking           | user only `<PrivateRoute>` | Parking information form adding button                       |


## Components

- Login and Signup Page
- HomePage
- ProfilePage
- AddNewParkingPage
- HomeSidebar
- OneParking
- Navbar
- CustomizedDialogs
- User

# Server / Backend

## Models

bookingSchema

```
{
   parking:{
        type:Schema.Types.ObjectId,
       ref:'Parking',
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    startTime:{
        type:Date,
        default: KSAdate
    },
    endTime:{
        type:Date,
        
    },
    totalPrice:{
        type:Number,
    },
    date:{
        type:Date,
        default: KSAdate
    }
}
```

parkingSchema

```
 {
    latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  StreetName: {
    type: String,
  },
  numberOfParking: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
   
 }
```
serviceSchema

```
{
   nameOfservice:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type: String
    },
    price:{
        type:Number
    }
}
```
userSchema

```
{
   phone:{
        type:Number,
    },
    email:{
        type: String,
        required: [true, 'please enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter valid email']
    },
    password:{
        type: String,
        required: [true, 'please enter  password'],
        minlength: [6, 'minimum password length is 6 characters']
    },
    userType: {
        type: String,
        enum:['user','admin'],
        default: 'user'
    }  
}