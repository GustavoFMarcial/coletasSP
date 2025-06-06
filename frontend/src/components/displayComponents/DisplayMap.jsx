import EditModal from "./DisplayEditModal.jsx";

function DisplayMap({collaborator, data, doneCollect, editCollect, deleteCollect, readOnly}) {

    return(
        <tbody>
            {readOnly ? 
                data.map((item, index, array) =>
                    <tr key={index} className="mainRow">
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.username}</td>
                        <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.company}</td>
                        <td className={index % 2 == 0 ? "border-l-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-l-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.date}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.product}</td>
                        {/* <td className="">teste</td>
                        <td className=""></td>
                        <td className=""></td> */}
                    </tr>
                )
                :
                data.map((item, index, array) =>
                    <tr key={index} className="mainRow">
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.username}</td>
                        <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.company}</td>
                        <td className={index % 2 == 0 ? "border-l-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-l-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.date}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.product}</td>
                        {collaborator.role == "Administrador" || collaborator.role == "Gestor" ?
                            <>
                                <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><img onClick={() => doneCollect(item.id)} src="/assets/images/done.png" alt="done button"/></td>
                                <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><EditModal editCollect={editCollect} item={item}/></td>
                                <td className={index % 2 == 0 ? "border-r-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-r-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><img onClick={() => deleteCollect(item.id)} src="/assets/images/delete.png" alt="delete button"/></td>
                            </>
                            :
                            <>
                                {collaborator.name == item.username ?
                                <>
                                    <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}></td>
                                    <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><EditModal editCollect={editCollect} item={item}/></td>
                                    <td className={index % 2 == 0 ? "border-r-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-r-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><img onClick={() => deleteCollect(item.id)} src="/assets/images/delete.png" alt="delete button"/></td>
                                </>
                                :
                                <>
                                    <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}></td>
                                    <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}></td>
                                    <td className={index % 2 == 0 ? "border-r-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-r-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}></td>
                                </>
                                }
                            </>
                        }
                    </tr>
                )
            }
        </tbody>
    )
}

export default DisplayMap;