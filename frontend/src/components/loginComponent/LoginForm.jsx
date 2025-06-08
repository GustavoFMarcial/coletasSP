import { useState } from "react";

function LoginForm({ login }) {
    const [credentials, setCredentials] = useState({
        login: "",
        password: "",
    })

    function handleInput(event) {
        setCredentials(c => ({...c, [event.target.name]: event.target.value}));
    }

    return (
        <>
            <div className="login">
                <div className="login-container">
                    <div className="login-input">
                        <label>Login</label>
                        <input className="bg-white border" onChange={handleInput} value={credentials.login} type="text" name="login" required autoComplete="off"/>
                    </div>
                    <div className="password-input">
                        <label>Senha</label>
                        <input className="bg-white border" onChange={handleInput} value={credentials.password} type="password" name="password" required autoComplete="off"/>
                    </div>
                    <div className="login-button">
                        <button className="border" onClick={() => login(credentials)} >Logar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm;