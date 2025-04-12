import { useState } from "react";

function DisplayInput({addCollect}) {

    const [input, setInput] = useState({
        company: "",
        date: "",
        product: "",
    })

    function handleInput(event) {
        const {name, value} = event.target;
        if (name == "company") {
            setInput({...input, company: value.trim()});
        }
        if (name == "date") {
            setInput({...input, date: value.trim()});
        }
        if (name == "product") {
            setInput({...input, product: value.trim()});
        }
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