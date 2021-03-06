import React from 'react'
import axios from 'axios'
import { useState } from "react";
import jwt from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import './signupLogin.css'

export default function SignUp_LogIn() {
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [signupErrors, setSignupErrors] = useState({
        email:"",
        password:""
    })
    const [loginErrors, setLoginErrors] = useState({
        email:"",
        password:""
    })

    let navigate = useNavigate()

    const signup = (e) => {
        e.preventDefault()

        axios
        .post('http://localhost:3001/signup',{
            email:Email,
            password:Password
        })
        .then((res) => {console.log(res)
            if(res.data.errors){ 
                setSignupErrors(res.data.errors)
                console.log(res.data.errors)

             }if(res.data.user){
                const token = res.data.token
                const userSign = jwt(token)
                localStorage.setItem('token', token)
                navigate('/')
            }
        }) 
        
     }

     const login= (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:3001/login',{
            email:Email,
            password:Password
        })
        .then((res) => {
            console.log(res)
            if(res.data.errors){
                setLoginErrors(res.data.errors)
                console.log(res.data.errors)
            }if(res.data.user){
                const token = res.data.token
                const userSign = jwt(token)
                localStorage.setItem('token', token)
                navigate('/')
                 

            }
        })  
        
     }

    return (
        <div>
        <div className='registerText'>
        <h2>SIGN UP FOR <span className='text2'>PARKING YARDS</span></h2>
            <h1>AND EARN REWARDS FOR EACH RESERVATION!</h1></div>
            <form className='registerform'>
            
            {/* SIGNUP */}
                 <div className='signupform'>

                 <label>SIGNUP</label>
                <input 
                className='logininputs'
                onChange={(e)=>{setEmail(e.target.value)}} 
                type="text" 
                name="email" 
                placeholder="Enter your email" required/><br/>
{signupErrors.email == "" ? "" : 
                <div className="alert alert-danger">
                <p>{signupErrors.email}</p>
                </div>
}

                <input 
                className='logininputs'
                onChange={(e)=>{setPassword(e.target.value)}} 
                type="password" 
                name="password" 
                placeholder="Password" required/><br/>
{signupErrors.password == "" ? "" : 
                <div className="alert alert-danger">
                <p>{signupErrors.password}</p>
                </div>
}

                <button className="button-8" onClick={(e) => signup(e)}>Signup</button>
                </div>
                <div class="vl"></div>
            {/* LOGIN */}
                <div className='loginform'>

                <label>LOGIN</label>
                <input 
                className='logininputs'
                onChange={(e)=>{setEmail(e.target.value)}} 
                type="text" 
                name="email" 
                placeholder="Enter your email" required/><br/>
 {loginErrors.email == "" ? "" : 
                <div className="alert alert-danger">
                <p>{loginErrors.email}</p>
                </div>
}

                <input 
                className='logininputs'
                onChange={(e)=>{setPassword(e.target.value)}} 
                type="password" 
                name="password" 
                placeholder="Password" required/><br/>
{loginErrors.password == "" ? "" : 
                <div className="alert alert-danger">
                <p>{loginErrors.password}</p>
                </div>
}

                <button className="button-8" onClick={(e) => login(e)}>Login</button>
                </div>
            </form>
        </div>
    )
}
