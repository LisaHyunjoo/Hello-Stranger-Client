import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Row, Col} from 'react-bootstrap'

const PostsList = (props) => {
    
    const navigate = useNavigate()
    return(
        <>
        <h2>Post List</h2>
        <button onClick={()=>{navigate("/posts/new")}} className="btn btn-primary">New Post</button>
        <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 6 }).map((_, idx) => (
               <Col>
               <Card>
                 <Card.Img src="https://picsum.photos/800/400" alt="" />
                 <Card.Body>
                 <Card.Title>Card title</Card.Title>
                </Card.Body>
          </Card>
        </Col>
        ))}
            
        </Row> 
   
        {/* {props.posts.map((post,id)=> {
            return(
                <>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                    <div className="card">
                        <img src="https://picsum.photos/800/400" className="card-img-top" alt=""/>
                        <div className="card-body">
                        <h3 className="card-title" key={post.id} onClick={()=>{navigate(`${post.id}`)}}>{post.title}</h3>
                        </div>   
                    </div>
                    </div>
                </div>
                </>
            )}
            )} */}
        </>
    )
}

export default PostsList

