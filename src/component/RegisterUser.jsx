export default function RegisterUser(props) {
    return(
        <>
        <form className="UserForm" id="register-form" onSubmit={props.register}>
            <div className="mb-3 row">
                <label htmlFor="name"  className="col-sm-2 col-form-label">Username: </label>
                    <div className="col-sm-10">
                    <input type="text" name="username" className="form-control" id="username" />
                    </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="name"  className="col-sm-2 col-form-label">Email </label>
                <div className="col-sm-10">
                <input type="email" name="email" className="form-control" id="email" placeholder="example@email.com"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="name"  className="col-sm-2 col-form-label">Password </label> 
                <div className="col-sm-10">
                <input type="password" id="password" name="password" className="form-control" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        </>
    )
}