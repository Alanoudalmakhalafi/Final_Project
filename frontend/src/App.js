import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import Home from "./Home/Home";
import SignUp_LogIn from "./SignUp_LogIn/SignUp_LogIn";
import AddParking from "./AddParking/AddParking";
import Profile from "./userProfile/Profile";
import BookingList from "./userProfile/BookingList";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" exact element={<Home />} />
        <Route path="/Signup&Login" element={<SignUp_LogIn />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AddNewParking" element={<AddParking />} />
        <Route path="/BookingList" element={<BookingList />} />

      </Routes>
    </div>
  );
}

export default App;
