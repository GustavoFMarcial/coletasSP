import HeaderLogin from "../headerComponents/HeaderLogin.jsx";
import LoginForm from "./LoginForm.jsx";
import "./Login.css";

function Login({login}) {

    return (
        <>
            <HeaderLogin />
            <LoginForm login={login} />
        </>
    )
}

export default Login;