import React, {useState, useEffect, useRef} from 'react'

const WritePost = (props) => {
    const [post, setPost] = useState({
        title: '',
        country: '',
        content: ''
    })

    const [countryList, setCountryList ] = useState([])
    const imgRef = useRef(null)
    const [imgList, setImgList] = useState([])
    const [viewBoolean, setViewBoolean] = useState(false)
    
    const getCountry = async() => {
        const res = await fetch("https://raw.githubusercontent.com/devopsdeveloper1107/Country-state-city-table-in-json/main/Country-State-Data-In-JSON")
        const countryListAll = await res.json();
        console.log(countryListAll)
        setCountryList(await countryListAll)
    }

    useEffect(() => {
        getCountry()
    }, [])

    const handleChange = (e) => {
        setPost((prev)=>({...prev, [e.target.id]: e.target.value}))
        console.log('target', e.target)
        console.log('post', post)

    }

    const handleSubmit = (e) => {
        // console.log(e.target)
        e.preventDefault()
        props.addPost(post)
        setPost({
            title:'',
            country:'',
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

            <select name="country" className='form-countrol' onChange={handleChange}>
                <option>--Select Country--</option>
                {countryList.map((countryget)=> (
                    <option key={countryget.country_id} id="country" value={countryget.country_name}>{countryget.country_name}</option>
                ))}
            </select>
        
            {/* <input className="file-upload-input" type='file' ref={imgRef} onChange={(event) => {
                const file = event.currentTarget.files[0]
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onloadend = (e) => {
                    setImgList((pre) => {
                        return [...pre, e.target.result]
                    })
                } 
                event.currentTarget.value=''
                setViewBoolean(true)
            }} />

            {viewBoolean ? <></> : <div>Choose Image</div>}
            {imgList.map((img, idx) => (
                <div>
                    <Image Key={img + idx} src={img}></Image> 
                </div>
            )) }
            <div>
            <button className='add-button' onClick={()=>{
                imgRef.current.click()
            }}>Add File</button>
            </div>  
 */}


            <div className="mb-3 row">
            <label htmlFor='content' className="form-label">Content: </label>
            <div className="col-sm-10">
            <textarea id="content" type="text" className="form-control" rows="10" value={post.content} onChange={handleChange}></textarea>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Add a post</button>
        </form>
        </>
    )
}

export default WritePost