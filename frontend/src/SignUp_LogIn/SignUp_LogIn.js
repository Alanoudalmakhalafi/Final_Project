import React from 'react'
import axios from 'axios'
import { useState } from "react";
import jwt from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import './signupLogin.css'

export default function SignUp_LogIn() {
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    let navigate = useNavigate()

    const signup= (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:3001/signup',{
            email:Email,
            password:Password
        })
        .then((res) => {console.log(res)
            if(res.data.errors){ 

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
        .then((res) => {console.log(res)
            if(res.data.errors){

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
            <form className='registerform'>
            {/* SIGNUP */}
                 <div className='signupform'>
                <input 
                onChange={(e)=>{setEmail(e.target.value)}} 
                type="text" 
                name="email" 
                placeholder="Enter your email" required/><br/>
                <div class="email error"></div>
                <input 
                onChange={(e)=>{setPassword(e.target.value)}} 
                type="password" 
                name="password" 
                placeholder="Password" required/><br/>
                <div class="password error"></div>
                <button className="button-8" onClick={(e) => signup(e)}>Signup</button>
                </div>
            {/* LOGIN */}
                <div className='loginform'>
                <input 
                onChange={(e)=>{setEmail(e.target.value)}} 
                type="text" 
                name="email" 
                placeholder="Enter your email" required/><br/>
                <div class="email error"></div>

                <input 
                onChange={(e)=>{setPassword(e.target.value)}} 
                type="password" 
                name="password" 
                placeholder="Password" required/><br/>
                <div class="password error"></div>

                <button className="button-8" onClick={(e) => login(e)}>Login</button>
                </div>
            </form>
        </div>
    )
}
