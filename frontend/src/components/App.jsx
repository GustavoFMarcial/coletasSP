import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import DisplayCollects from "./displayComponents/DisplayCollects.jsx";
import Loading from "./loadingComponents/Loading.jsx";
import "../../public/style.css";

function App() {
  const baseURL = "http://201.54.17.248:3000";
  const [token, setToken] = useState();
  const Login = lazy(() => import("./loginComponent/Login.jsx"));

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
        const result = await axios.get(`${baseURL}/login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        // const result = await axios.post("https://coletassp.onrender.com/login", credentials);
        const result = await axios.post(`${baseURL}/login`, credentials);
        const receivedToken = await result.headers["authorization"];
        const receivedName = await result.headers["name"];
        const receivedRole = await result.headers["role"];
        if (receivedToken) {
            sessionStorage.setItem("authToken", receivedToken);
            sessionStorage.setItem("name", receivedName);
            sessionStorage.setItem("role", receivedRole);
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
      {token ?
      <Suspense fallback={<Loading />}> 
        <DisplayCollects token={token}/> 
      </Suspense>
      :
      <Suspense fallback={<Loading />}>
        <Login login={login}/>   
      </Suspense>
      }
    </>
  )
}

export default App;