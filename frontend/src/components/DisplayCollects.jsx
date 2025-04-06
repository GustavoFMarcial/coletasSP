import axios from "axios";
import {useState, useEffect} from "react";
import EditModal from "./EditModal.jsx";

function DisplayCollects() {

    const [data, setData] = useState([]);
    const [input, setInput] = useState({
        company: "",
        date: "",
        product: "",
    })

    useEffect(() => {
        async function fetchData() {
            try {
              const result = await axios("http://localhost:3000/");
              setData(result.data);
            }
            catch (err) {
              console.error(err);
            }
            
          }

          fetchData();
    }, [])

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

    async function addCollect() {
        try {
            await axios.post("http://localhost:3000/add", input);
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function doneCollect(itemId) {
        try {
            await axios.post("http://localhost:3000/done", {itemId});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function deleteCollect(itemId) {
        try {
            await axios.post("http://localhost:3000/delete", {itemId});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function editCollect(input) {
        try {
            await axios.post("http://localhost:3000/edit", input);
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Empresa</th>
                    <th>Data</th>
                    <th>Material</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item, index) =>
                <tr key={index} className="mainRow">
                    <td>{item.company}</td>
                    <td>{item.date}</td>
                    <td>{item.product}</td>
                    <td><img onClick={() => doneCollect(item.id)} src="/assets/images/done.png" alt="done button"/></td>
                    <td><EditModal editCollect={editCollect} itemId={item.id}/></td>
                    <td><img onClick={() => deleteCollect(item.id)} src="/assets/images/delete.png" alt="delete button"/></td>
                </tr>
            )} 
            </tbody>
            <tbody>
                <tr>
                    <td><input onChange={handleInput} value={input.company} type="text" name="company" placeholder="Empresa"/></td>
                    <td><input onChange={handleInput} value={input.date} type="text" name="date" placeholder="Data"/></td>
                    <td><input onChange={handleInput} value={input.product} type="text" name="product" placeholder="Material"/></td>
                    <td><img src="/assets/images/add.png" alt="add button" onClick={addCollect}/></td>
                </tr>
            </tbody>
        </table>
    )
}

export default DisplayCollects;