const PostsList = (props) => {
    return(
        <>
        <h2>Post List</h2>
        {props.posts.map((post,id)=> {
            return(
                <section key={post.id}>
                    {post.title}
                </section>
            )
        })}
        </>
    )
}

export default PostsList