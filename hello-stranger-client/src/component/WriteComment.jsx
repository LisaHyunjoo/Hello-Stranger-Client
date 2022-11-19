import React, {useState} from 'react'

const WriteComment = (props) => {
    const [comment, setComment] = useState({
        content: ''
    })

    const handleChange = (e) => {
        setComment((prev)=>({...comment, [e.target.id]: e.target.value}))
        
    }

    const handleSubmit = (e) => {
        console.log(e.target)
        e.preventDefault()
        props.addComment(comment)
        setComment({
            content:""
        })
      };

 
    return(
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor='content'>Comment: </label>
            <textarea id="content" type="text" value={comment.content} onChange={handleChange}></textarea>
            <br/>
            <input type="submit" value="Add a comment"/>
        </form>
        </>
    )
}

export default WriteComment