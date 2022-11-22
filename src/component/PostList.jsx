import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Row, Col} from 'react-bootstrap'

const PostsList = (props) => {
    const navigate = useNavigate()
    return(
        <>
        <button onClick={()=>{navigate("/posts/new")}} className="btn btn-primary">New Post</button>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
        {props.posts.map((post,id)=> {
            return(
                <>
                <div className="col">
                    <div className="card">
                        <img src="https://picsum.photos/800/400" className="card-img-top" alt=""/>
                        <div className="card-body">
                        <h3 className="card-title" key={post.id} onClick={()=>{navigate(`${post.id}`)}}>{post.title}</h3>
                        </div>   
                    </div>
                </div>    
                </>
            )}
            )}
         </div>
        </>
    )
}

export default PostsList

