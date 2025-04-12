import { useState } from "react";
import DisplayHeader from "./DisplayHeader";

function EditModal({editCollect, itemId, company, date, product}) {

    const [input, setInput] = useState({
        input: itemId,
        company: company,
        date: date,
        product: product,
    });

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

    
    function openDialog(id) {
        const dialog = document.getElementById(`${id}`);
        dialog.showModal();
    }

    return (
        <>
            <dialog id={itemId}>
                <table>
                    <DisplayHeader />
                    <tbody>
                        <tr>
                            <td><input onChange={handleInput} value={input.company} type="text" name="company" placeholder="Empresa" required/></td>
                            <td><input onChange={handleInput} value={input.date} type="text" name="date" placeholder="Data" required/></td>
                            <td><input onChange={handleInput} value={input.product} type="text" name="product" placeholder="Material" required/></td>
                            <td><img onClick={() => editCollect(input)} src="/assets/images/done.png" alt="done button"/></td>
                        </tr>
                    </tbody>
                </table>
            </dialog>
            <img onClick={() => openDialog(itemId)} src="/assets/images/edit.png" alt="edit button"/>
        </>
    )
}

export default EditModal;