import React, {useState} from 'react'

const WritePost = (props) => {
    const [post, setPost] = useState({
        title: '',
        content: ''
    })

    const handleChange = (e) => {
        setPost((prev)=>({...post, [e.target.id]: e.target.value}))
        
    }

    const handleSubmit = (e) => {
        console.log(e.target)
        e.preventDefault()
        props.addPost(post)
        setPost({
            title:'',
            content: ''
        })
      };

    
 
    return(
        <>
        <h3>Write a new post</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input id="title" type="text" value={post.title} onChange={handleChange}/>
            <br/>
            <label htmlFor='content'>Content: </label>
            <textarea id="content" type="text" value={post.content} onChange={handleChange}></textarea>
            <br/>
            <input type="submit" value="Add a post"/>
        </form>
        </>
    )
}

export default WritePost