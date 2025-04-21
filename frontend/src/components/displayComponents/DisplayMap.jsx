import EditModal from "./DisplayEditModal.jsx";
import {Suspense, lazy} from "react";

function DisplayMap({data, doneCollect, editCollect, deleteCollect}) {
    const Loading = lazy(() => import ("../Loading.jsx"));

    return(
        <Suspense fallback={<Loading />}>
            <tbody>
                {data.map((item, index) =>
                    <tr key={index} className="mainRow">
                        <td>{item.company}</td>
                        <td>{item.date}</td>
                        <td>{item.product}</td>
                        <td><img onClick={() => doneCollect(item.id)} src="/assets/images/done.png" alt="done button"/></td>
                        <td><EditModal editCollect={editCollect} item={item}/></td>
                        <td><img onClick={() => deleteCollect(item.id)} src="/assets/images/delete.png" alt="delete button"/></td>
                    </tr>
                )} 
            </tbody>
        </Suspense>
    )
}

export default DisplayMap;