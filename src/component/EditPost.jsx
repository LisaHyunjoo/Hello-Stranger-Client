import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const EditPost = (props) => {
    const [post, setPost] = useState({})
    let {id} = useParams()

    let baseUrl = 'http://localhost:8000/api/v1'

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
            // console.log("this is the data: ", data.data);
            setPost(data.data);
          });
      };

    useEffect(() => {
    getOnePostById(id);
    }, []);
    
   const handleChange = (e) => {
    //    console.log('value', e.target)
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
      <form className="PostForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor='title' className="col-sm-2 col-form-label">Title: </label>
          <div className="col-sm-10">
          <input id="title" name="title" type="text" className="form-control"  value={post.title} onChange={handleChange}/>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor='content' className="form-label">Content: </label>
          <div className="col-sm-10">
          <textarea id="content" name="content" type="text" class="form-control" rows="10" value={post.content} onChange={handleChange}></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Edit post</button>
      </form>
    </>
    )
}

export default EditPost