import './App.css';
import React from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import NavBar from './component/NavBar';
import Home from './component/Home';
import RegisterUser from './component/RegisterUser';

let baseUrl = 'http://localhost:8000'

export default function App() {
  // const navigate = useNavigate()


  const register = async(e) => {
    e.preventDefault()
    console.log(e.target)
    const url = baseUrl + '/hellostranger/user/register'
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
        // navigate("login")
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterUser register={register}/>}/>
      </Routes>
    </>
  )
}
