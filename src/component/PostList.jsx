import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const PostsList = (props) => {
    const navigate = useNavigate()

    return(
        <>
        <h2>Post List</h2>
        {props.posts.map((post,id)=> {
            return(
                <section key={post.id}>
                    <h3 onClick={()=>{navigate(`${post.id}`)}}>{post.title}</h3>
                </section>
            )
        })}
         <button onClick={()=>{navigate("/posts/new")}}>New Post</button>
        </>
    )
}

export default PostsList