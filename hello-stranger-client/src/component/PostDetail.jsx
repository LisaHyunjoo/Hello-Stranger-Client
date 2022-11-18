import React , {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const PostDetail = (props) => {
    let [post, setPost] = useState({})
    let [comment, setComment] = useState([])
   
    let {id} = useParams()
    const navigate = useNavigate()

    let baseUrl = 'http://localhost:8000'

    const getOnePostById = (id) => {
        fetch(baseUrl + '/posts/' + id, {
            credentials: "include"
        })
        .then(res => {
            if(res.status === 200) {
                return res.json()
            } else {
                return []
            }
        }) .then(data => {
            // console.log('data',data.data)
            setPost(data.data)
        })
    }


  const getComments = (post) => {
    fetch(baseUrl + '/posts/' + id + '/comment', {
      credentials: "include"
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return []
      }
    }).then(data => {
    //   console.log(data.data)
      setComment(data.data)
    })
  }

    useEffect(()=>{
        // console.log(post)
        getOnePostById(id)
        getComments(post)
    }, [])

 
    return(
        <>
            <h2>Post Detail</h2>
            <h3>{post.title}</h3>
            <h3>{post.content}</h3>
            {comment.map((comment,id)=> {
            return(
                <section key={comment.id}>
                    <h5 onClick={()=>{navigate(`${comment.id}`)}}>{comment.content}</h5>
                </section>
            )
            })}
            <button onClick={()=>{navigate("/posts/"+ id + "/edit")}}>Edit</button>
            <button onClick={()=>{props.deletePost(post.id)}}>Delete</button>
        </>
    )
}

export default PostDetail