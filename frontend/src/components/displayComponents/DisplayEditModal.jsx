import { useState, useEffect } from "react";
import DisplayHeader from "./DisplayHeader";
import DisplayAutoSearchCompany from "./DisplayAutoSearchCompany.jsx";
import DisplayAutoSearchProduct from "./DisplayAutoSearchProduct.jsx";

function EditModal({ editCollect, item }) {
    const [autoSearchCompany, setAutoSearchCompany] = useState(false);
    const [autoSearchProduct, setAutoSearchProduct] = useState(false);
    const [input, setInput] = useState({
        id: item.id,
        company: item.company,
        date: item.date,
        product: item.product,
        volume: item.volume,
        weight: item.weight,
        order: item.order,
    });

    useEffect(() => {
        setInput({
        id: item.id,
        company: item.company,
        date: item.date,
        product: item.product,
        volume: item.volume,
        weight: item.weight,
        order: item.order,
    })
    }, [item])

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

    function openDialog(id) {
        const dialog = document.getElementById(`${id}`);
        dialog.showModal();
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

    return (
        <>
            <div className="edit-dialog-container">
                <dialog className="edit-input-dialog" id={item.id}>
                    <table>
                        <DisplayHeader />
                        <tbody>
                            <tr>
                                <td className="border-x-1 border-gray-400 border-b-1 bg-gray-100 text-gray-600 pl-1"></td>
                                <td className="border-gray-400 bg-gray-100 border-b-1 text-gray-600 pl-1"><input className="bg-white max-w-[150px]" onChange={handleInput} onMouseDown={handleMouseDown} value={input.company} type="text" name="company" placeholder="Empresa" required autoComplete="off"/></td>
                                <td className="border-l-1 border-gray-400 border-b-1 bg-gray-100 text-gray-600 pl-1"><input className="bg-white max-w-[150px]" onChange={handleInput} value={input.date} type="text" name="date" placeholder="Data" required autoComplete="off"/></td>
                                <td className="border-x-1 border-gray-400 border-b-1 bg-gray-100 text-gray-600 pl-1"><input className="bg-white max-w-[150px]" onChange={handleInput} onMouseDown={handleMouseDown} value={input.product} type="text" name="product" placeholder="Material" required autoComplete="off"/></td>
                                <td className="border-gray-400 bg-gray-100 border-b-1 text-gray-600 pl-1"><input className="bg-white max-w-[150px]" onChange={handleInput} onMouseDown={handleMouseDown} value={input.volume} type="text" name="volume" placeholder="Volume" required autoComplete="off"/></td>
                                <td className="border-x-1 border-gray-400 border-b-1 bg-gray-100 text-gray-600 pl-1"><input className="bg-white max-w-[150px]" onChange={handleInput} onMouseDown={handleMouseDown} value={input.weight} type="text" name="weight" placeholder="Peso" required autoComplete="off"/></td>
                                <td className="border-r-1 border-gray-400 border-b-1 bg-gray-100 text-gray-600 pl-1"><input className="bg-white max-w-[150px]" onChange={handleInput} onMouseDown={handleMouseDown} value={input.order} type="text" name="order" placeholder="Pedido" required autoComplete="off"/></td>
                                <td className="border-gray-400 border-b-1 bg-gray-100 text-gray-600 pl-1"></td>
                                <td className="border-gray-400 bg-gray-100 border-b-1 text-gray-600 pl-1"><img className="min-w-[25px] min-h-[25px]" onClick={() => editCollect(input, item.id)} src="/assets/images/done.png" alt="done button"/></td>
                                <td className="border-r-1 border-gray-400 border-b-1 bg-gray-100 text-gray-600 pl-1"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><DisplayAutoSearchCompany autoSearch={autoSearchCompany} input={input} handleClick={handleClick}/></td>
                                <td></td>
                                <td><DisplayAutoSearchProduct autoSearch={autoSearchProduct} input={input} handleClick={handleClick}/></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </dialog>
            </div>
            <img className="min-w-[25px] min-h-[25px]" onClick={() => openDialog(item.id)} src="/assets/images/edit.png" alt="edit button"/>
        </>
    )
}

export default EditModal;