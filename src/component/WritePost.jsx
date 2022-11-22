import React, {useState, useEffect} from 'react'
const Country = require('country-state-city').Country
const State = require('country-state-city').State
const City = require('country-state-city').City

const WritePost = (props) => {
    const [post, setPost] = useState({
        title: '',
        country: '',
        content: ''
    })

    const [country, setCountry ] = useState([])
    const [state, setState] = useState()
    
    const getCountry = async() => {
        const res = await fetch("https://raw.githubusercontent.com/devopsdeveloper1107/Country-state-city-table-in-json/main/Country-State-Data-In-JSON")
        const conuntryList = await res.json();
        console.log(conuntryList)
        setCountry(await conuntryList)
    }

    useEffect(() => {
        getCountry()
    }, [])

    const handleChange = (e) => {
        setPost((prev)=>({...post, [e.target.id]: e.target.value}))
        // setCountry((prev)=>({...post, [e.target.id]: e.target.value}))
    }

    const handleSubmit = (e) => {
        // console.log(e.target)
        e.preventDefault()
        props.addPost(post)
        setPost({
            title:'',
            content: ''
        })
        // setCountry({
        //     country:'',
        // })
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
                    <option key={countryget.country_id} value={countryget.country_id}>{countryget.country_name}</option>
                ))

                }
            </select>
            <select name="state" className='form-countrol' onChange={handleChange}>
                <option>--Select State--</option>
                {country.map((countryget)=> (
                    <option key={countryget.country_id} value={countryget.country_id}>{countryget.country_name}</option>
                ))

                }
            </select>

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