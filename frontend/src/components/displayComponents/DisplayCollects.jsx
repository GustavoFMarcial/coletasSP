import axios from "axios";
import { useState, useEffect, Suspense, lazy } from "react";
import Header from "../headerComponents/Header.jsx";
import DisplayHeader from "./DisplayHeader.jsx";
import DisplayMap from "./DisplayMap.jsx";
import DisplayInput from "./DisplayInput.jsx";
import DisplayFilter from "./DisplayFilter.jsx";
import Pagination from "../paginationComponent/Pagination.jsx";
import "./Display.css";

function DisplayCollects() {
    const [data, setData] = useState([]);
    const [readOnly, setReadOnly] = useState(false);
    const [input, setInput] = useState(false);
    const [collaborator, setCollaborator] = useState({
      name: "",
      role: "",
    });
    const [filter, setFilter] = useState("coletas");
    const [page, setPage] = useState(1);
    const [tableRows, setTableRows] = useState();
    const Loading = lazy(() => import("../loadingComponents/Loading.jsx"));

    useEffect(() => {
        async function fetchData() {
            try {
              const newFilter = "coletas";
              const result = await axios("https://coletassp.onrender.com/", {params: {
                filter: newFilter,
                page: page,
              }});
              // const result = await axios("http://localhost:3000/", {params: {
              //   filter: filter,
              //   page: page,
              // }});
              const receivedName = sessionStorage.getItem("name");
              const receivedRole = sessionStorage.getItem("role");
              setCollaborator({
                name: receivedName,
                role: receivedRole,
              })
              setTableRows(result.data.count);
              setData(result.data.data);
            }
            catch (err) {
              console.error(err);
            }
          }

          fetchData();
    }, [page])

    async function toCollectFilter() {
        try {
              const newFilter = "coletas";
              setPage(1);
              setFilter(newFilter);
              const result = await axios("https://coletassp.onrender.com/", {params: {
                filter: newFilter,
                page: page,
              }});
              // const result = await axios("http://localhost:3000/", {params: {
              //   filter: newFilter,
              //   page: page,
              // }});
              setTableRows(result.data.count);
              setData(result.data.data);
              setReadOnly(false);
              setInput(false);
            }
            catch (err) {
              console.error(err);
            }
    }

    async function collectedFilter() {
        try {
              const newFilter = "coletasfeitas";
              setPage(1);
              setFilter(newFilter);
              const result = await axios("https://coletassp.onrender.com/", {params: {
                filter: newFilter,
                page: page,
              }});
              // const result = await axios("http://localhost:3000/", {params: {
              //   filter: newFilter,
              //   page: page,
              // }});
              setTableRows(result.data.count);
              setData(result.data.data);
              setReadOnly(true);
              setInput(false);
            }
            catch (err) {
              console.error(err);
            }
    }

    async function approveFilter() {
      try {
            const newFilter = "coletasaprovar";
            setPage(1);
            setFilter(newFilter);
            const result = await axios("https://coletassp.onrender.com/", {params: {
              filter: newFilter,
              page: page,
            }});
            // const result = await axios("http://localhost:3000/", {params: {
            //   filter: newFilter,
            //   page: page,
            // }});
            setTableRows(result.data.count);
            setData(result.data.data);
            setReadOnly(false);
            setInput(true);
          }
          catch (err) {
            console.error(err);
          }
  }

    async function deletedCollectsFilter() {
        try {
            const newFilter = "coletasdeletadas";
            setPage(1);
            setFilter(newFilter);
              const result = await axios("https://coletassp.onrender.com/", {params: {
                filter: newFilter,
                page: page,
              }});
              // const result = await axios("http://localhost:3000/", {params: {
              //   filter: newFilter,
              //   page: page,
              // }});
              setTableRows(result.data.count);
              setData(result.data.data);
              setReadOnly(true);
              setInput(false);
            }
            catch (err) {
              console.error(err);
            }
    }

    async function doneCollect(itemId) {
        try {
            await axios.post("https://coletassp.onrender.com/done", {itemId});
            // await axios.post("http://localhost:3000/done", {itemId, filter});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function editCollect(input, itemId) {
        try {
            await axios.post("https://coletassp.onrender.com/edit", {input, collaborator});
            // await axios.post("http://localhost:3000/edit", {input, collaborator, filter, itemId});
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
            // await axios.post("http://localhost:3000/delete", {itemId, filter});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function addCollect(data) {
        try {
            await axios.post("https://coletassp.onrender.com/add", {data, collaborator});
            // await axios.post("http://localhost:3000/add", {data, collaborator});
            window.location.reload();
        }
        catch (err) {
            console.error(err);
            window.alert(err.response.data);
        }
    }

    function handlePagination(event) {
        setPage(event.target.value);
    }

    return (
        <>
            <Header collaborator={collaborator}/>
            <DisplayFilter approveFilter={approveFilter} toCollectFilter={toCollectFilter} collectedFilter={collectedFilter} deletedCollectsFilter={deletedCollectsFilter}/>
            <table>
                <DisplayHeader />
                <Suspense fallback={<Loading />}>
                    <DisplayMap collaborator={collaborator} data={data} readOnly={readOnly} doneCollect={doneCollect} editCollect={editCollect} deleteCollect={deleteCollect}/>
                </Suspense>
                {input ? <DisplayInput addCollect={addCollect}/> : "" }
            </table>
            <Pagination tableRows={tableRows} handlePagination={handlePagination}/>
        </>
    )
}

export default DisplayCollects;