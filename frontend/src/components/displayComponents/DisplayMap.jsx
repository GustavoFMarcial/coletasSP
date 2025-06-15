import EditModal from "./DisplayEditModal.jsx";

function DisplayMap({ collaborator, data, doneCollect, editCollect, deleteCollect, readOnly, closeModalSignal }) {

    return(
        <tbody>
            {readOnly ? 
                data.map((item, index, array) =>
                    <tr key={index} className="mainRow">
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.username}</td>
                        <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.company}</td>
                        <td className={index % 2 == 0 ? "border-l-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-l-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.date}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.product}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.volume}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.weight}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.order_number}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.loja}</td>
                    </tr>
                )
                :
                data.map((item, index, array) =>
                    <tr key={index} className="mainRow">
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.username}</td>
                        <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.company}</td>
                        <td className={index % 2 == 0 ? "border-l-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-l-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.date}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.product}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.volume}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.weight}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.order_number}</td>
                        <td className={index % 2 == 0 ? "border-x-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-x-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}>{item.loja}</td>
                        {collaborator.role == "Administrador" || collaborator.role == "Gestor" ?
                            <>
                                <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><img className="min-w-[25px] min-h-[25px]" onClick={() => doneCollect(item.id)} src="/assets/images/done.png" alt="done button"/></td>
                                <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><EditModal closeModalSignal={closeModalSignal} editCollect={editCollect} item={item}/></td>
                                <td className={index % 2 == 0 ? "border-r-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-r-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><img className="min-w-[25px] min-h-[25px]" onClick={() => deleteCollect(item.id)} src="/assets/images/delete.png" alt="delete button"/></td>
                            </>
                            :
                            <>
                                {collaborator.name == item.username ?
                                <>
                                    <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}></td>
                                    <td className={index % 2 == 0 ? "border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><EditModal closeModalSignal={closeModalSignal} editCollect={editCollect} item={item}/></td>
                                    <td className={index % 2 == 0 ? "border-r-1 border-gray-400 bg-gray-100 text-gray-600 pl-1" : "border-r-1 border-gray-400 text-gray-600 pl-1"} style={index == array.length - 1 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}}><img className="min-w-[25px] min-h-[25px]" onClick={() => deleteCollect(item.id)} src="/assets/images/delete.png" alt="delete button"/></td>
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