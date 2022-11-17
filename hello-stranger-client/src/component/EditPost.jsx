import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const EditPost = (props) => {
    const [post, setPost] = useState({})
    let {id} = useParams()

    let baseUrl = 'http://localhost:8000/hellostranger'

    const getOnePostById = (id) => {
        fetch(baseUrl + "/posts/" + id, {
          credentials: "include",
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              return [];
            }
          })
          .then((data) => {
            console.log("this is the data: ", data.data);
            setPost(data.data);
          });
      };

    useEffect(() => {
    getOnePostById(id);
    }, []);
    
   const handleChange = (e) => {
       console.log('value', e.target)
        setPost((prev)=>({...post, [e.target.name]: e.target.value }))
        
    }

    const handleSubmit = (e) => {
        // console.log(e.target)
        e.preventDefault()
        props.updatePost(post)
        setPost({
            title: "",
            content: ""
        })
      };

 
    return(
        <>
            <h3>Edit Post</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title: </label>
                <input id="title" name="title" type="text"  value={post.title} onChange={handleChange}/>
                <br/>
                <label htmlFor='content'>Content: </label>
                <textarea id="content" name="content" type="text" value={post.content} onChange={handleChange}></textarea>
                <br/>
                <input type="submit" value="Edit a post"/>
            </form>
        </>
    )
}

export default EditPost