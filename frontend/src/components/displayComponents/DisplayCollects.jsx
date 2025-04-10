import axios from "axios";
import {useState, useEffect} from "react";
import DisplayHeader from "./DisplayHeader.jsx";
import DisplayMap from "./DisplayMap.jsx";
import DisplayInput from "./DisplayInput.jsx";

function DisplayCollects() {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
              const result = await axios("https://coletassp.onrender.com");
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
            await axios.post("https://coletassp.onrender.com/done", {itemId});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function editCollect(input) {
        try {
            await axios.post("https://coletassp.onrender.com/edit", input);
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function deleteCollect(itemId) {
        try {
            await axios.post("https://coletassp.onrender.com/delete", {itemId});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function addCollect(data) {
        try {
            await axios.post("https://coletassp.onrender.com/add", data);
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