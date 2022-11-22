import React, {useState, useEffect} from 'react'

const WritePost = (props) => {
    const [post, setPost] = useState({
        title: '',
        country: '',
        content: ''
    })

    const [country, setCountry ] = useState([])
    // const [countryId, setCountryId] = useState('')
    
    const getCountry = async() => {
        const res = await fetch("https://raw.githubusercontent.com/devopsdeveloper1107/Country-state-city-table-in-json/main/Country-State-Data-In-JSON")
        const conuntryList = await res.json();
        // console.log(conuntryList)
        setCountry(await conuntryList)
    }

    // const getState = async() => {
    //     const res = await fetch("https://raw.githubusercontent.com/devopsdeveloper1107/Country-state-city-table-in-json/main/Country-State-Data-In-JSON")
    //     const stateList = await res.json();
    //     console.log(stateList)
    //     setCountry(await stateList)
    // }

    useEffect(() => {
        getCountry()
        // getState()
    }, [])

    const handleChange = (e) => {
        setPost((prev)=>({...prev, [e.target.id]: e.target.value}))
        console.log(e.target)
        console.log(post)

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
                {country.map((countryget)=> (
                    <option key={countryget.country_id} id="country" value={countryget.country_name}>{countryget.country_name}</option>
                ))}
            </select>
            {/* <select name="state" className='form-countrol' onChange={handleChange}>
                <option>--Select State--</option>
                {state.map((stateget)=> (
                    <option key={stateget.state_id} value={stateget.state_id}>{stateget.state_name}</option>
                ))}
            </select> */}

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