import { useState } from "react";

function DisplayInput({addCollect}) {

    const [input, setInput] = useState({
        company: "",
        date: "",
        product: "",
    })

    function handleInput(event) {
        setInput(i => ({...i, [event.target.name]: event.target.value}));
    }

    return(
        <tbody>
            <tr>
                <td><input onChange={handleInput} value={input.company} type="text" name="company" placeholder="Empresa" required/></td>
                <td><input onChange={handleInput} value={input.date} type="text" name="date" placeholder="Data" required/></td>
                <td><input onChange={handleInput} value={input.product} type="text" name="product" placeholder="Material" required/></td>
                <td><img src="/assets/images/add.png" alt="add button" onClick={() => addCollect(input)}/></td>
            </tr>
        </tbody>
    )
}

export default DisplayInput;