import './App.css';
import NavBar from './Navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom";
import Home from './Home/Home';
import SignUp_LogIn from './SignUp_LogIn/SignUp_LogIn';

function App() {
  return (
    <div>
    <NavBar/>
    <Routes>
    <Route exact path='/' exact element={<Home />} />
    <Route path='/Signup&Login' element={<SignUp_LogIn />} />
    
    </Routes>

    </div>
  );
}

export default App;
