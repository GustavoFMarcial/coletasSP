import axios from "axios";
import {useState, useEffect} from "react";

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
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Empresa</th>
                    <th>Data</th>
                    <th>Material</th>
                </tr>
            </thead>
            {data.map((item, index) =>
                <tbody key={index}>
                    <tr className="mainRow">
                        <td>{item.id}</td>
                        <td>{item.company}</td>
                        <td>{item.date}</td>
                        <td>{item.product}</td>
                        <td><img src="/assets/images/done.png" alt="done button"/></td>
                        <td><img src="/assets/images/edit.png" alt="edit button"/></td>
                        <td><img src="/assets/images/delete.png" alt="delete button"/></td>
                    </tr>
                </tbody>
            )}
            <tbody>
                <tr>
                    <td></td>
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