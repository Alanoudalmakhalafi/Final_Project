import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import Home from "./Home/Home";
import SignUp_LogIn from "./SignUp_LogIn/SignUp_LogIn";
import AddParking from "./AddParking/AddParking";
import * as Bootstrap from 'react-bootstrap';
import Profile from "./userProfile/Profile";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" exact element={<Home />} />
        <Route path="/Signup&Login" element={<SignUp_LogIn />} />
        <Route path="/AdminProfile" element={<Profile />} />
        <Route path="/AddNewParking" element={<AddParking />} />
      </Routes>
    </div>
  );
}

export default App;
