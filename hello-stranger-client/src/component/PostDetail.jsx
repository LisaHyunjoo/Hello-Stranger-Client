import React , {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = (props) => {
    let [post, setPost] = useState({})
    let {id} = useParams()

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
            console.log(data.data)
            setPost(data.data)
        })
    }

    useEffect(()=>{
        getOnePostById(id)
    }, [])

    return(
        <>
            <h3>{post.title}</h3>
            <h5>{post.content}</h5>
        </>
    )
}

export default PostDetail