import { useState } from "react";

function EditModal({editCollect, itemId}) {

    const [input, setInput] = useState({
        input: itemId,
        company: "",
        date: "",
        product: "",
    });

    function handleInput(event) {
        const {name, value} = event.target;
        if (name == "company") {
            setInput({...input, company: value});
        }
        if (name == "date") {
            setInput({...input, date: value});
        }
        if (name == "product") {
            setInput({...input, product: value});
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
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Data</th>
                            <th>Material</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input onChange={handleInput} value={input.company} type="text" name="company" placeholder="Empresa"/></td>
                            <td><input onChange={handleInput} value={input.date} type="text" name="date" placeholder="Data"/></td>
                            <td><input onChange={handleInput} value={input.product} type="text" name="product" placeholder="Material"/></td>
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