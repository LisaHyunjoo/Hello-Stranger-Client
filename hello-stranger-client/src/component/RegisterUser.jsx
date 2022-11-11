export default function RegisterUser(props) {
    return(
        <form id="register-form" onSubmit={props.register}>
            <strong>Register</strong>
            <label htmlFor="name">Username: </label>
            <input type="text" id="name" name="username"/>
            <label htmlFor="name">Email: </label>
            <input type="text" id="email" name="email"/>
            <label htmlFor="name">Password: </label>
            <input type="text" id="password" name="password"/>
            <input type="submit" value="signup"/>
        </form>
    )
}