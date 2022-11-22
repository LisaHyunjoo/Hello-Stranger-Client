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
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-auto">
            <label htmlFor='content'  className="form-label">Comment: </label>
            </div>
            <div className="col-auto">
            <input id="content" type="text" className="form-control"  value={comment.content} onChange={handleChange}></input>
            </div>
            <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Add a comment</button>
            </div>
        </form>
        </>
    )
}

export default WriteComment