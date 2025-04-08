import axios from "axios";
import {useState, useEffect} from "react";
import DisplayHeader from "./DisplayHeader.jsx";
import DisplayMap from "./DisplayMap.jsx";
import DisplayInput from "./DisplayInput.jsx";
import EditModal from "./EditModal.jsx";

function DisplayCollects() {

    const [data, setData] = useState([]);

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

    async function addCollect(data) {
        try {
            await axios.post("http://localhost:3000/add", data);
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    return (
        <table>
            <DisplayHeader />
            <DisplayMap data={data} doneCollect={doneCollect} editCollect={editCollect} deleteCollect={deleteCollect}/>
            <DisplayInput addCollect={addCollect}/>
        </table>
    )
}

export default DisplayCollects;