import { useState } from "react";
import DisplayAutoSearchCompany from "./DisplayAutoSearchCompany.jsx";
import DisplayAutoSearchProduct from "./DisplayAutoSearchProduct.jsx";

function DisplayInput({addCollect}) {

    const [autoSearchCompany, setAutoSearchCompany] = useState(false);
    const [autoSearchProduct, setAutoSearchProduct] = useState(false);
    const [input, setInput] = useState({
        company: "",
        date: "",
        product: "",
    })

    function handleInput(event) {
        setInput(i => ({...i, [event.target.name]: event.target.value}));
    }

    function handleMouseDown(event) {
        if (event.target.name == "company") {
            setAutoSearchCompany(true);
            setAutoSearchProduct(false);
        }
        if (event.target.name == "product") {   
            setAutoSearchProduct(true);
            setAutoSearchCompany(false);
        }
    }

    function handleClick(event) {
        setInput(i => ({...i, [event.target.name]: event.target.value}));
        setAutoSearchCompany(false);
        setAutoSearchProduct(false);
    }

    return(
        <tbody>
            <tr>
                <td><input onChange={handleInput} onMouseDown={handleMouseDown} value={input.company} type="text" name="company" placeholder="Empresa" required autoComplete="off"/></td>
                <td><input onChange={handleInput} value={input.date} type="text" name="date" placeholder="Data" required autoComplete="off"/></td>
                <td><input onChange={handleInput} onMouseDown={handleMouseDown} value={input.product} type="text" name="product" placeholder="Material" required autoComplete="off"/></td>
                <td><img src="/assets/images/add.png" alt="add button" onClick={() => addCollect(input)}/></td>
            </tr>
            <tr>
                <td><DisplayAutoSearchCompany autoSearch={autoSearchCompany} input={input} handleClick={handleClick}/></td>
                <td></td>
                <td><DisplayAutoSearchProduct autoSearch={autoSearchProduct} input={input} handleClick={handleClick}/></td>
            </tr>
        </tbody>
    )
}

export default DisplayInput;