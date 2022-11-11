export default function LoginUser(props) {
    return(
        <form>
            <strong>Login</strong>
            <label htmlFor="name">Email: </label>
            <input type="text" id="email" name="email"/>
            <label htmlFor="name">Password: </label>
            <input type="text" id="password" name="password"/>
            <input type="submit" value="login"/>
        </form>
    )
}