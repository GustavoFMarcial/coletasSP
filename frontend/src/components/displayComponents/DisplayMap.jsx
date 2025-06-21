import EditModal from "./DisplayEditModal.jsx";

function DisplayMap({ collaborator, data, doneCollect, editCollect, deleteCollect, readOnly, closeModalSignal }) {
    const date = new Date(data?.[0]?.created_at);
    const created_at = date.toLocaleDateString("pt-BR");

    return(
        <tbody>
            {readOnly ? 
                data.map((item, index, array) =>
                    <tr key={index} className="mainRow border-l-1 border-r-1 border-gray-400 text-gray-600">
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.username}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{created_at}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.company}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.date}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.product}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.volume}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.weight}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.order_number}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.branch}</td>
                    </tr>
                )
                :
                data.map((item, index, array) =>
                    <tr key={index} className="mainRow border-l-1 border-r-1 border-gray-400 text-gray-600">
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.username}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{created_at}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.company}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.date}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.product}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.volume}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.weight}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.order_number}</td>
                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-r-1 pl-1" : "border-r-1 border-gray-400 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.branch}</td>
                        {collaborator.role == "Administrador" || collaborator.role == "Gestor" ?
                            <>
                                <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><img className="min-w-[25px] min-h-[25px]" onClick={() => doneCollect(item.id)} src="/assets/images/done.png" alt="done button"/></td>
                                {collaborator.role == "Administrador" ? 
                                    <>
                                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><EditModal created_at={created_at} closeModalSignal={closeModalSignal} editCollect={editCollect} item={item}/></td>
                                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><img className="min-w-[25px] min-h-[25px]" onClick={() => deleteCollect(item.id)} src="/assets/images/delete.png" alt="delete button"/></td>
                                    </>
                                    :
                                    <>
                                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-t-1" : "border-gray-400"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}></td>
                                        <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400 border-t-1" : "border-gray-400"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}></td>
                                    </>
                                }
                                
                            </>
                            :
                            <>
                                {collaborator.name == item.username ?
                                <>
                                    <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"}></td>
                                    <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"}><EditModal created_at={created_at} closeModalSignal={closeModalSignal} editCollect={editCollect} item={item}/></td>
                                    <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"}><img className="min-w-[25px] min-h-[25px]" onClick={() => deleteCollect(item.id)} src="/assets/images/delete.png" alt="delete button"/></td>
                                </>
                                :
                                <>
                                    <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"}></td>
                                    <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"}></td>
                                    <td className={index % 2 == 0 ? "bg-gray-100 border-gray-400" : "border-gray-400"}></td>
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