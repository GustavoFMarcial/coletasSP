import axios from "axios";
import { useState, useRef } from "react";

function ChangePasswordModal({ collaborator, token }) {
    const baseURL = "http://operantus.com.br/api";;
    const [input, setInput] = useState("");
    const dialogRef = useRef(null);

    function openDialog() {
         if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    function handleInput(event) {
        setInput(event.target.value);
    }

    async function changePassword() {
        try {
            // await axios.post("https://coletassp.onrender.com/password",
            //     {
            //         name: collaborator.name,
            //         role: collaborator.role,
            //         input: input
            //     },
            //     {
            //         headers: {
            //         Authorization: `Bearer ${token}`,
            //         },
            //     },
            // );
            await axios.post(`${baseURL}/password`,
                {
                    name: collaborator.name,
                    role: collaborator.role,
                    input: input
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                },
            );
            setInput("");
            if (dialogRef.current) {
                dialogRef.current.close();
            }
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err.response.data);
        }
    }

    return (
        <>
            <div className="password-dialog-container">
                <dialog ref={dialogRef} className="change-password-dialog" id="password-dialog">
                    <div>
                        <label htmlFor="password">Nova senha</label>
                        <input className="border border-gray-400" onChange={handleInput} value={input} type="password" name="password" id="password" required />
                    </div>
                    <button className="border border-gray-400" type="button" onClick={changePassword}>Mudar senha</button>
                </dialog>
            </div>  
            <img onClick={openDialog} src="assets/images/lock.svg" alt="padlock" />
        </>
    )
}

export default ChangePasswordModal;
