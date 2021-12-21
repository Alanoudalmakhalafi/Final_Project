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
| `/AdminProfile`  | Profile              | user only `<PrivateRoute>` | User information form and update button                      |
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