import axios from "axios";
import { useState, useEffect, Suspense, lazy } from "react";
import Header from "../headerComponents/Header.jsx";
import DisplayHeader from "./DisplayHeader.jsx";
import DisplayMap from "./DisplayMap.jsx";
import DisplayInput from "./DisplayInput.jsx";
import DisplayFilter from "./DisplayFilter.jsx";
import "./Display.css";

function DisplayCollects() {
    const [data, setData] = useState([]);
    const [readOnly, setReadOnly] = useState(false);
    const [collaborator, setCollaborator] = useState({
      name: "",
      role: "",
    });
    const Loading = lazy(() => import("../loadingComponents/Loading.jsx"));

    useEffect(() => {
        async function fetchData() {
            try {
              const result = await axios("https://coletassp.onrender.com/", {params: {
                filter: "coletas",
              }});
              // const result = await axios("http://localhost:3000/", {params: {
              //   filter: "coletas",
              // }});
              const receivedName = sessionStorage.getItem("name");
              const receivedRole = sessionStorage.getItem("role");
              setCollaborator({
                name: receivedName,
                role: receivedRole,
              })
              setData(result.data);
            }
            catch (err) {
              console.error(err);
            }
          }

          fetchData();
    }, [])

    async function toCollectFilter() {
        try {
              const result = await axios("https://coletassp.onrender.com/", {params: {
                filter: "coletas",
              }});
              // const result = await axios("http://localhost:3000/", {params: {
              //   filter: "coletas",
              // }});
              setData(result.data);
              setReadOnly(false);
            }
            catch (err) {
              console.error(err);
            }
    }

    async function collectedFilter() {
        try {
              const result = await axios("https://coletassp.onrender.com/", {params: {
                filter: "coletasfeitas",
              }});
              // const result = await axios("http://localhost:3000/", {params: {
              //   filter: "coletasfeitas",
              // }});
              setData(result.data);
              setReadOnly(true);
            }
            catch (err) {
              console.error(err);
            }
    }

    async function deletedCollectsFilter() {
        try {
              const result = await axios("https://coletassp.onrender.com/", {params: {
                filter: "coletasdeletadas",
              }});
              // const result = await axios("http://localhost:3000/", {params: {
              //   filter: "coletasdeletadas",
              // }});
              setData(result.data);
              setReadOnly(true);
            }
            catch (err) {
              console.error(err);
            }
    }

    async function doneCollect(itemId) {
        try {
            await axios.post("https://coletassp.onrender.com/done", {itemId});
            // await axios.post("http://localhost:3000/done", {itemId});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function editCollect(input) {
        try {
            await axios.post("https://coletassp.onrender.com/edit", {input, collaborator});
            // await axios.post("http://localhost:3000/edit", {input, collaborator});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err.response.data);
        }
    }

    async function deleteCollect(itemId) {
        try {
            await axios.post("https://coletassp.onrender.com/delete", {itemId});
            // await axios.post("http://localhost:3000/delete", {itemId});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function addCollect(data) {
        try {
          console.log("addCollect", collaborator);
            await axios.post("https://coletassp.onrender.com/add", {data, collaborator});
            // await axios.post("http://localhost:3000/add", {data, collaborator});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err.response.data);
        }
    }

    console.log("displaycollects", collaborator);

    return (
        <>
            <Header collaborator={collaborator}/>
            <DisplayFilter toCollectFilter={toCollectFilter} collectedFilter={collectedFilter} deletedCollectsFilter={deletedCollectsFilter}/>
            <table>
                <DisplayHeader />
                <Suspense fallback={<Loading />}>
                    <DisplayMap data={data} readOnly={readOnly} doneCollect={doneCollect} editCollect={editCollect} deleteCollect={deleteCollect}/>
                </Suspense>
                {readOnly ? "" : <DisplayInput addCollect={addCollect}/>}
            </table>
        </>
    )
}

export default DisplayCollects;