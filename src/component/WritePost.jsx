import React, {useState, useEffect} from 'react'

const WritePost = (props) => {
    const [post, setPost] = useState({
        title: '',
        country: '',
        content: ''
    })

    const handleChange = (e) => {
        setPost((prev)=>({...post, [e.target.id]: e.target.value}))
        
    }

    const handleSubmit = (e) => {
        // console.log(e.target)
        e.preventDefault()
        props.addPost(post)
        setPost({
            title:'',
            content: ''
        })
      };
 
    return(
        <>
        <form className="PostForm" onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor='title' className="col-sm-2 col-form-label">Title: </label>
            <div className="col-sm-10">
            <input id="title" type="text" className="form-control" value={post.title} onChange={handleChange}/>
            </div>
            </div>

            <div className="mb-3 row">
            <label htmlFor='content' class="form-label">Content: </label>
            <div className="col-sm-10">
            <textarea id="content" type="text" class="form-control" rows="10" value={post.content} onChange={handleChange}></textarea>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Add a post</button>
        </form>
        </>
    )
}

export default WritePost