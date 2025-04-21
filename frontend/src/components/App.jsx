import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./loginComponent/Login.jsx";
import DisplayCollects from "./displayComponents/DisplayCollects.jsx";

function App() {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const savedToken = sessionStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    async function checkUser() {
      if (!token) return;
      try {
        // const result = await axios.get("https://coletassp.onrender.com/login", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const result = await axios.get("http://localhost:3000/login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.data == "VT") {
          setAuth(true);
        }
      }
      catch (err) {
        console.error(err);
        window.alert("Token inválido. Faça login novamente.");
        sessionStorage.removeItem("authToken");
      } 
    }

    checkUser();
  }, [token]);

  async function login(credentials) {
    try {
        const result = await axios.post("https://coletassp.onrender.com/login", credentials);
        // const result = await axios.post("http://localhost:3000/login", credentials);
        const receivedToken = await result.headers["authorization"];
        console.log(result);
        if (receivedToken) {
            sessionStorage.setItem("authToken", receivedToken);
            setToken(receivedToken);
        }
        if (!receivedToken) {
            console.log("Nenhum token foi recebido.");
        }
    }
    catch (err) {
        console.error("Erro ao fazer login: ", err);
        window.alert("Credenciais incorretas");
    }
}

  return (
    <>
      {auth ? <DisplayCollects /> : <Login login={login}/>}
    </>
  )
}

export default App;