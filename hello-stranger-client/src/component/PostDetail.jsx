import React , {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const PostDetail = (props) => {
    let [post, setPost] = useState({})
    let {id} = useParams()
    const navigate = useNavigate()

    let baseUrl = 'http://localhost:8000/hellostranger'

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
            console.log('data',data.data)
            setPost(data.data)
        })
    }

    useEffect(()=>{
        getOnePostById(id)
    }, [])

    return(
        <>
            <h2>Post Detail</h2>
            <h3>{post.title}</h3>
            <h5>{post.content}</h5>
            <button onClick={()=>{navigate("/posts/"+ id + "/edit")}}>Edit</button>
            <button onClick={()=>{props.deletePost(post.id)}}>Delete</button>
        </>
    )
}

export default PostDetail