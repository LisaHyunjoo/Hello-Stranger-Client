import './App.css';
import React, { useState, useEffect } from 'react'
import {Route, Routes, useNavigate, useParams} from 'react-router-dom';
// import NavBar from './component/NavBar';
import Home from './component/Home';
import RegisterUser from './component/RegisterUser';
import LoginUser from './component/LoginUser';
import PostList from "./component/PostList"
import PostDetail from "./component/PostDetail"
import WritePost from "./component/WritePost"
import EditPost from "./component/EditPost"
import {Navbar, Container } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


// let baseUrl = process.env.REACT_APP_BACKEND_URL
let baseUrl = 'http://localhost:8000'

export default function App() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState()
  const [userRegister, setUserRegister] = useState(null)
  const [userLogin, setUserLogin] = useState(null)
  const navigate = useNavigate()

  const register = async(e) => {
  e.preventDefault()
  // console.log(e.target)
  fetch(baseUrl + '/user/register', {
    method:'POST',
    body:JSON.stringify({
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
    })
    .then (res => res.json())
    .then (resJson => {
        // console.log(resJson)
        setUser(resJson.data.username)
        localStorage.setItem('user', JSON.stringify(resJson.data.username))
        if (resJson.status.code === 401) {
            console.log('error', resJson.status.message)
            setUserRegister(false)
        } else {
            setUser(e.target.username.value)
            setUserRegister(true)
            navigate('/login')
        }
    })
    }

  const login = async (e) => {
    e.preventDefault();
    fetch(
        baseUrl + "/user/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
        .then (res => res.json())
        .then (resJson => {
            // console.log(resJson)
            setUser(e.target.email.value)
            localStorage.setItem('user', JSON.stringify(resJson.data.email))
            if (resJson.status.code === 401) {
                setUserLogin(false)
                alert("Username or Password is incorrect")
            } else {
                setUserLogin(true)
                getPosts()
                navigate("/posts")
            }
        })
    }

    
  const logout = (e) => {
      e.preventDefault()
      localStorage.clear()
      setUser(null)
      fetch(baseUrl + '/user/logout')
      navigate('/')
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
      // console.log(data.data)
      setPosts(data.data)
    })
  }


  const addPost = (post) => {
    fetch(baseUrl + '/posts/', {
      method: 'POST',
      body: JSON.stringify(
          {title: post.title, 
          content: post.content}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })

    .then((res) => {
        if(res.status === 200) {
            return res.json()
        } else {
            return []
        }
      }) .then(data => {
      console.log('data', data.data)
      getPosts()
      navigate("/posts")
    })
  }

  const updatePost = (post) => {
    fetch(baseUrl + `/posts/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title:post.title,
        content:post.content
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
    .then((res) => {
        if(res.status === 200) {
            return res.json()
        } else {
            return []
        }
      }) .then(data => {
      console.log('edit data', data.data)
      getPosts()
      navigate(`/posts/${post.id}`)
    })
  }

  const deletePost = (id) => {
    fetch(baseUrl + `/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then (res => {
      const copyPost = [...posts]
      const findIndex = posts.findIndex(post => post.id === id)
      copyPost.splice(findIndex, 1)
      setPosts(copyPost)
    })
    navigate("/posts")
  }
  
  useEffect(()=>{
    getPosts();
  }, [])

  return (
    <>
      <Navbar className="navbar navbar-expand-lg bg-info">
        <Container className='nav-container'>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <div>
          {user !== undefined ? 
           <div>
           <Navbar.Brand as={Link} to="/" onClick={logout}>Logout</Navbar.Brand> 
           </div>
            :
             <div>
             <Navbar.Brand as={Link} to="/register">Register</Navbar.Brand>
             <Navbar.Brand as={Link} to="/login">Log In</Navbar.Brand> 
            </div>
          }
          </div>
          <Navbar.Brand as={Link} to="/posts">Posts</Navbar.Brand>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterUser register={register}/>}/>
        <Route path="/login" element={<LoginUser login={login}/>}/>
        <Route path="/posts" element={<PostList posts={posts}/>}/>
        <Route path="/posts/:id" element={<PostDetail deletePost={deletePost} />}/>
        <Route path="/posts/new" element={<WritePost addPost={addPost}/>}/>
        <Route path="/posts/:id/edit" element={<EditPost updatePost={updatePost}/>}/>
      </Routes>
    </>
  )
}
