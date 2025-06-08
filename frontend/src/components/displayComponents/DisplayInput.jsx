import { useState } from "react";
import DisplayAutoSearchCompany from "./DisplayAutoSearchCompany.jsx";
import DisplayAutoSearchProduct from "./DisplayAutoSearchProduct.jsx";

function DisplayInput({ addCollect }) {
    const [autoSearchCompany, setAutoSearchCompany] = useState(false);
    const [autoSearchProduct, setAutoSearchProduct] = useState(false);
    const [input, setInput] = useState({
        company: "",
        date: "",
        product: "",
        volume: "",
        weight: "",
        order: "",
    })

    function handleInput(event) {
        const value = event.target.value;
        const name = event.target.name;
        const blockedFields = ["volume", "weight", "order"];
        const onlyDigits = /^[0-9]{0,12}$/;

        if (blockedFields.includes(name) && !onlyDigits.test(value)) {
            return;
        }

        if (name === "date") {
        
            const partialDateRegex = /^[0-9/]{0,10}$/;
            if (!partialDateRegex.test(value)) return;

            let digits = value.replace(/\D/g, "");

            if (digits.length > 8) digits = digits.slice(0, 8);

            let newValue = digits;
            if (digits.length > 4) {
                newValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
            } 
            else if (digits.length > 2) {
                newValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
            }

            setInput(i => ({ ...i, [name]: newValue }));
            return;
        }

        let newValue = value;

        if ((value.length === 2 || value.length === 5) && event.nativeEvent.inputType === "insertText" && name === "date") {
            newValue += "/";
        }

        setInput(i => ({ ...i, [name]: newValue }));
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
            <tr className="tr-input">
                <td className="border-x-1 border-gray-400 border-b-1 border-t-1 bg-gray-100 text-gray-600 pl-1"></td>
                <td className="border-gray-400 bg-gray-100 border-b-1 border-t-1 text-gray-600 pl-1"><input className="bg-white" onChange={handleInput} onMouseDown={handleMouseDown} value={input.company} type="text" name="company" placeholder="Empresa" required autoComplete="off"/></td>
                <td className="border-l-1 border-gray-400 border-b-1 border-t-1 bg-gray-100 text-gray-600 pl-1"><input className="bg-white" onChange={handleInput} value={input.date} type="text" name="date" placeholder="Data" required autoComplete="off"/></td>
                <td className="border-x-1 border-gray-400 border-b-1 border-t-1 bg-gray-100 text-gray-600 pl-1"><input className="bg-white" onChange={handleInput} onMouseDown={handleMouseDown} value={input.product} type="text" name="product" placeholder="Material" required autoComplete="off"/></td>
                <td className="border-gray-400 bg-gray-100 border-b-1 border-t-1 text-gray-600 pl-1"><input className="bg-white" onChange={handleInput} onMouseDown={handleMouseDown} value={input.volume} type="text" name="volume" placeholder="Volume" required autoComplete="off"/></td>
                <td className="border-gray-400 bg-gray-100 border-l-1 border-b-1 border-t-1 text-gray-600 pl-1"><input className="bg-white" onChange={handleInput} onMouseDown={handleMouseDown} value={input.weight} type="text" name="weight" placeholder="Peso" required autoComplete="off"/></td>
                <td className="border-x-1 border-gray-400 border-b-1 border-t-1 bg-gray-100 text-gray-600 pl-1"><input className="bg-white" onChange={handleInput} onMouseDown={handleMouseDown} value={input.order} type="text" name="order" placeholder="Pedido" required autoComplete="off"/></td>
                <td className="border-gray-400 border-b-1 border-t-1 bg-gray-100 text-gray-600 pl-1"></td>
                <td className="border-gray-400 bg-gray-100 border-b-1 border-t-1 text-gray-600 pl-1"><img className="min-w-[25px] min-h-[25px]" src="/assets/images/add.png" alt="add button" onClick={() => addCollect(input)}/></td>
                <td className="border-r-1 border-gray-400 border-b-1 border-t-1 bg-gray-100 text-gray-600 pl-1"></td>
            </tr>
            <tr>
                <td></td>
                <td><DisplayAutoSearchCompany autoSearch={autoSearchCompany} input={input} handleClick={handleClick}/></td>
                <td></td>
                <td><DisplayAutoSearchProduct autoSearch={autoSearchProduct} input={input} handleClick={handleClick}/></td>
            </tr>
        </tbody>
    )
}

export default DisplayInput;