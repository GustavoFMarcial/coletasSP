import axios from "axios";
import { useState, useEffect, Suspense, lazy } from "react";
import Header from "../headerComponents/Header.jsx";
import DisplayHeader from "./DisplayHeader.jsx";
import DisplayMap from "./DisplayMap.jsx";
import DisplayInput from "./DisplayInput.jsx";
import DisplayFilter from "./DisplayFilter.jsx";
import Pagination from "../paginationComponent/Pagination.jsx";
import "./Display.css";

function DisplayCollects({ token }) {
    const [data, setData] = useState([]);
    const [readOnly, setReadOnly] = useState(sessionStorage.getItem("readOnly") === "true" ? true : false);
    const [input, setInput] = useState(false);
    const [collaborator, setCollaborator] = useState({
      name: "",
      role: "",
    });
    const [filter, setFilter] = useState(sessionStorage.getItem("filter") || "coletas");
    const [page, setPage] = useState(1);
    const [tableRows, setTableRows] = useState();
    const [triggerFetch, setTriggerFetch] = useState(0);
    const [closeModalSignal, setCloseModalSignal] = useState(0);
    const [resetInput, setResetInput] = useState(0);
    const Loading = lazy(() => import("../loadingComponents/Loading.jsx"));

    useEffect(() => {
        async function fetchData() {
            if (sessionStorage.getItem("filter") == "coletasaprovar") {
              setInput(true);
            }
            try {
              // const result = await axios("https://coletassp.onrender.com/", {
              //   params: {
              //     filter: filter,
              //     page: page,
              //   },
              //   headers: {
              //       Authorization: `Bearer ${token}`,
              //   },
              // });
              const result = await axios("http://localhost:3000/", {
                  params: {
                    filter: filter,
                    page: page,
                  },
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
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
    }, [page, filter, triggerFetch])

    async function toCollectFilter() {
        try {
              const newFilter = "coletas";
              setPage(1);
              setFilter(newFilter);
              // const result = await axios("https://coletassp.onrender.com/", {
              //   params: {
              //     filter: newFilter,
              //     page: page,
              // },
              //   headers: {
              //       Authorization: `Bearer ${token}`,
              //   },
              // });
              const result = await axios("http://localhost:3000/", {
                params: {
                  filter: newFilter,
                  page: page,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
              });
              sessionStorage.setItem("filter", newFilter);
              sessionStorage.setItem("readOnly", false);
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
              // const result = await axios("https://coletassp.onrender.com/", {
              //   params: {
              //     filter: newFilter,
              //     page: page,
              //   },
              //   headers: {
              //       Authorization: `Bearer ${token}`,
              //   },
              // });
              const result = await axios("http://localhost:3000/", {
                params: {
                  filter: newFilter,
                  page: page,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
              });
              sessionStorage.setItem("filter", newFilter);
              sessionStorage.setItem("readOnly", true);
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
            // const result = await axios("https://coletassp.onrender.com/", {
            //   params: {
            //     filter: newFilter,
            //     page: page,
            //   },
            //   headers: {
            //       Authorization: `Bearer ${token}`,
            //   },
            // });
            const result = await axios("http://localhost:3000/", {
                params: {
                  filter: newFilter,
                  page: page,
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            sessionStorage.setItem("filter", newFilter);
            sessionStorage.setItem("readOnly", false);
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
              // const result = await axios("https://coletassp.onrender.com/", {
              //   params: {
              //     filter: newFilter,
              //     page: page,
              // },
              //   headers: {
              //       Authorization: `Bearer ${token}`,
              //   },
              // });
              const result = await axios("http://localhost:3000/", {
                params: {
                  filter: newFilter,
                  page: page,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
              });
              sessionStorage.setItem("filter", newFilter);
              sessionStorage.setItem("readOnly", true);
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
            // await axios.post("https://coletassp.onrender.com/done", {itemId, filter}, {headers: { Authorization: `Bearer ${token}` }});
            await axios.post("http://localhost:3000/done", {itemId, filter}, {headers: { Authorization: `Bearer ${token}` }});
            setTriggerFetch(t => (t + 1));
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function editCollect(input, itemId) {
        try {
            // await axios.post("https://coletassp.onrender.com/edit", {input, collaborator, filter, itemId}, {headers: { Authorization: `Bearer ${token}` }});
            await axios.post("http://localhost:3000/edit", {input, collaborator, filter, itemId}, {headers: { Authorization: `Bearer ${token}` }});
            setTriggerFetch(t => (t + 1));
            setCloseModalSignal(c => (c + 1));
        }
        catch (err) {
            console.error(err);
            window.alert(err.response.data);
        }
    }

    async function deleteCollect(itemId) {
        try {
            // await axios.post("https://coletassp.onrender.com/delete", {itemId, filter}, {headers: { Authorization: `Bearer ${token}` }});
            await axios.post("http://localhost:3000/delete", {itemId, filter}, {headers: { Authorization: `Bearer ${token}` }});
            setTriggerFetch(t => (t + 1));
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }

    async function addCollect(data) {
        try {
            // await axios.post("https://coletassp.onrender.com/add", {data, collaborator}, {headers: { Authorization: `Bearer ${token}` }});
            await axios.post("http://localhost:3000/add", {data, collaborator}, {headers: { Authorization: `Bearer ${token}` }});
            setTriggerFetch(t => (t + 1));
            setResetInput(r => (r + 1));
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
            <Header collaborator={collaborator} token={token}/>
            <DisplayFilter filter={filter} approveFilter={approveFilter} toCollectFilter={toCollectFilter} collectedFilter={collectedFilter} deletedCollectsFilter={deletedCollectsFilter}/>
            <table>
                <DisplayHeader readOnly={readOnly} data={data}/>
                <Suspense fallback={<Loading />}>
                    <DisplayMap closeModalSignal={closeModalSignal} collaborator={collaborator} data={data} readOnly={readOnly} doneCollect={doneCollect} editCollect={editCollect} deleteCollect={deleteCollect}/>
                </Suspense>
                {input ? <DisplayInput resetInput={resetInput} addCollect={addCollect}/> : "" }
            </table>
            <Pagination tableRows={tableRows} handlePagination={handlePagination}/>
        </>
    )
}

export default DisplayCollects;