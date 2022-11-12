import './App.css';
import React, { useState, useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom';
import NavBar from './component/NavBar';
import Home from './component/Home';
import RegisterUser from './component/RegisterUser';
import LoginUser from './component/LoginUser';
import PostsList from "./component/PostList"

let baseUrl = 'http://localhost:8000/hellostranger'

export default function App() {
  const [posts, setPosts] = useState([])

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
      console.log('response', response)
      
      const data = await response.json()
      console.log(data)

      if(response.status=== 200) {
        console.log('register is working')
        getPosts()
        navigate("/login")
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }
  

  const login = async (e) => {

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
        
        const data = await response.json()
        // console.log(data)
        if(data.message || data.error) {
          console.log('Invalid ID or password')
          navigate("/login")
        } else if (response.status === 200) {
            navigate("/")
          }
      }
      catch (err) {
        console.log('Error => ', err);
      }
    }

    const getPosts = () => {
      fetch(baseUrl + '/posts/', {
        credentials: "include"
      })
      .then(res => {
        if(res.status === 200) {
          return res.json()
        } else {
          return []
        }
      }).then(data => {
        console.log(data.data)
        setPosts(data.data)
      })
    }

    useEffect(()=>{
      getPosts()
    }, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterUser register={register}/>}/>
        <Route path="/login" element={<LoginUser login={login}/>}/>
        <Route path="/posts" element={<PostsList posts={posts}/>}/>
      </Routes>
    </>
  )
}
