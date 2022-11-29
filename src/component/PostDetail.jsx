import React , {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import WriteComment from './WriteComment'

const PostDetail = (props) => {
    let [post, setPost] = useState({})
    let [comments, setComments] = useState([])
   
    let {id} = useParams()
    const navigate = useNavigate()

    let baseUrl = 'http://localhost:8000/api/v1'

    const getOnePostById = (post) => {
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
      setComments(data.data)
    })
  }

  const addComment = (comment) => {
    fetch(baseUrl + '/posts/' + id + '/comment', {
      method: 'POST',
      body: JSON.stringify(
          {content: comment.content}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })

    .then((res) => {
        // console.log('res', res)
        if(res.status === 200) {
            return res.json()
        } else {
            return []
        }
      }) .then(data => {
    //   console.log('data', data)
      getComments()
      navigate(`/posts/${id}`)
    })
  }

  const deleteComment = (id) => {
      fetch(baseUrl + '/posts/' + id + '/comment/' + id, {
          method:'DELETE',
          headers: {
              'Content-Type':'application/json'
          },
          credentials:"include"
      }). then(res => {
          const copyComment = [...comments]
          const findIndex = comments.findIndex(comment => comment.id === id)
        //   console.log(copyComment)
          copyComment.splice(findIndex, 1 )
          setComments(copyComment)
          navigate(`/posts/${id}`)
      })
  }

    useEffect(()=>{
        // console.log(post)
        getOnePostById(id)
        getComments(post)
    }, [])

 
    return(
    <>
      <div className="card text" >
        <div className="card-body" id="card-body">
          <h3 className="card-header" id="post-title">{post.title}</h3>
          <h5 className="card-text" id="post-content">{post.content}</h5>
        </div>
      </div>
      <button className="btn btn-danger" id="delete-btn"onClick={()=>{
        alert('Do you want to delete the post?')
        props.deletePost(post.id)}}>Delete</button>
      <button className="btn btn-warning" id="edit-btn" onClick={
        ()=>{navigate("/posts/"+ id + "/edit")}}>Edit</button>

      <WriteComment addComment={addComment}/>
        {comments.map((comment,id)=> {
        return(
          <section className="row g-2" key={comment.id}>
             <div className="col-auto">
            <h5 id="post-comment">{comment.content}</h5>
            </div>
            <div className="col-auto">
            <button className="btn btn-secondary mb-2" onClick={()=>{deleteComment(comment.id)}}>X</button> 
            </div>
          </section>
        )
        })}
    </>
    )
}

export default PostDetail