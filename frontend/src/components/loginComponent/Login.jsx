import Header from "../Header";
import LoginForm from "./LoginForm.jsx";

function Login({login}) {

    return (
        <>
            <Header />
            <LoginForm login={login} />
        </>
    )
}

export default Login;