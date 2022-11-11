import './App.css';
import React from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom';
import NavBar from './component/NavBar';
import Home from './component/Home';
import RegisterUser from './component/RegisterUser';
import LoginUser from './component/LoginUser';

let baseUrl = 'http://localhost:8000/hellostranger'

export default function App() {
  const navigate = useNavigate()

  const register = async(e) => {
    e.preventDefault()
    console.log(e.target)
    const url = baseUrl + '/user/register'
    try {
      const response = await fetch(url, {
        method:'POST',
        body:JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if(response.status === 201) {
        console.log('register is working')
        navigate("/login")
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  const login = async (e) => {
    console.log('loginUser')
    console.log(e.target.email.value)
    e.preventDefault()
    const url = baseUrl + '/user/login'
    const loginBody = {
      email: e.target.email.value,
      password: e.target.password.value
    }

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(loginBody),
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include"
        })
  
        console.log(response)
        console.log("BODY: ",response.body)
  
        if (response.status === 200) {
          navigate("/")
        }
      }
      catch (err) {
        console.log('Error => ', err);
      }
    }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterUser register={register}/>}/>
        <Route path="/login" element={<LoginUser login={login}/>}/>
      </Routes>
    </>
  )
}
