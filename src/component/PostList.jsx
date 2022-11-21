import React from 'react'
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button} from 'react-bootstrap'

const PostsList = (props) => {
    const navigate = useNavigate()

    return(
        <>
       
        <h2>Post List</h2>
        {/* {props.posts.map((post,id)=> {
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                 <div className="card">
                  
                    <div className="card-body">
                        <h5 className="card-title">
                        <section key={post.id}>
                            <h3 onClick={()=>{navigate(`${post.id}`)}}>
                                {post.title}</h3></section></h5>
                             
                    </div>
                </div>
                </div>
            </div>
        })  */}
        {props.posts.map((post,id)=> {
            return(
                <Card className='row row-cols-1 row-cols-md-2 g-4' >
                <Card.Body>
                <section key={post.id}>
                    <h3 onClick={()=>{navigate(`${post.id}`)}}>
                        <Card.Img src="https://picsum.photos/600/300"/>
                        <Card.Title>{post.title}</Card.Title></h3>
                </section>
                </Card.Body>
                </Card>
            )
        })}
         <Button onClick={()=>{navigate("/posts/new")}}>New Post</Button>
        </>
    )
}

export default PostsList