export default function LoginUser(props) {
    return(
        <form className="myForm" onSubmit={props.login}>
            <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Email </label>
                <div className="col-sm-10">
                <input type="text" id="email" name="email" className="form-control"/>
                </div>
            </div>
            <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Password </label>
            <div className="col-sm-10">
            <input type="password" id="password" name="password" className="form-control"/>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
        </form>
    )
}