import React from 'react'
import {NavLink, Link} from 'react-router-dom'

export default function NavBar() {
    return(
        <nav>
            <li>Home</li>
            <li>Register</li>
            <li>Login</li>
            <li>Posts</li>

            {/* <NavLink to="register">Register</NavLink>
            <NavLink to="login">Log In</NavLink>
            <NavLink to="posts">Posts</NavLink> */}
        </nav>
    )
}