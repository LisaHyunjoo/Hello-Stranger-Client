import React , {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import WriteComment from './WriteComment'

const PostDetail = (props) => {
    let [post, setPost] = useState({})
    let [comments, setComments] = useState([])
   
    let {id} = useParams()
    const navigate = useNavigate()

    let baseUrl = 'http://localhost:8000'

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
        console.log('res', res)
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
            <h2>Post Detail</h2>
            <h3>{post.title}</h3>
            <h3>{post.content}</h3>
            <WriteComment addComment={addComment}/>
            {comments.map((comment,id)=> {
            return(
                <section key={comment.id}>
                    <h5 onClick={()=>{navigate(`${comment.id}`)}}>{comment.content}</h5>
                    <button onClick={()=>{deleteComment(comment.id)}}>X</button> 
                 </section>
            )
            })}
            <button onClick={()=>{navigate("/posts/"+ id + "/edit")}}>Edit</button>
            <button onClick={()=>{props.deletePost(post.id)}}>Delete</button>
        </>
    )
}

export default PostDetail