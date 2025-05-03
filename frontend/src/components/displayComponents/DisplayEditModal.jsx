import { useState } from "react";
import DisplayHeader from "./DisplayHeader";
import DisplayAutoSearchCompany from "./DisplayAutoSearchCompany.jsx";
import DisplayAutoSearchProduct from "./DisplayAutoSearchProduct.jsx";

function EditModal({editCollect, item}) {

    const [autoSearchCompany, setAutoSearchCompany] = useState(false);
    const [autoSearchProduct, setAutoSearchProduct] = useState(false);
    const [input, setInput] = useState({
        id: item.id,
        company: item.company,
        date: item.date,
        product: item.product,
    });

    function handleInput(event) {
        setInput(i => ({...i, [event.target.name]: event.target.value}));
        if (input.date.length == 1 || input.date.length == 4) {
            if (event.nativeEvent.inputType == "insertText") {
                setInput(i => ({...i, [event.target.name]: event.target.value.concat("/")}));
            }
        }
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
            <div className="dialog-container">
                <dialog id={item.id}>
                    <table>
                        <DisplayHeader />
                        <tbody>
                            <tr>
                                <td></td>
                                <td><input onChange={handleInput} onMouseDown={handleMouseDown} value={input.company} type="text" name="company" placeholder="Empresa" required autoComplete="off"/></td>
                                <td><input onChange={handleInput} value={input.date} type="text" name="date" placeholder="Data" required autoComplete="off"/></td>
                                <td><input onChange={handleInput} onMouseDown={handleMouseDown} value={input.product} type="text" name="product" placeholder="Material" required autoComplete="off"/></td>
                                <td><img onClick={() => editCollect(input)} src="/assets/images/done.png" alt="done button"/></td>
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
            <img onClick={() => openDialog(item.id)} src="/assets/images/edit.png" alt="edit button"/>
        </>
    )
}

export default EditModal;