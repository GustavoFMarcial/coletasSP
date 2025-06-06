function DisplayHeader({ readOnly, data }) {
    const borderBottomStyle = data == 0 ? {borderBottom: "1px solid #9CA3AF"} : {borderBottom: "none"}
    console.log(data);

    return (
        <>
        {readOnly ?
            <thead className="rounded-xs">
                <tr>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black rounded-tl-lg pl-1">Usuário</th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black pl-1">Empresa</th>
                    <th className="border-l-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Data</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black rounded-tr-lg pl-1">Material</th>
                    {/* <th></th>
                    <th></th>
                    <th></th> */}
                </tr>
            </thead>
        :
            <thead>
                <tr>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black rounded-tl-lg pl-1">Usuário</th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black pl-1">Empresa</th>
                    <th className="border-l-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Data</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black rounded-tr-lg pl-1">Material</th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black rounded-tr-lg pl-1"></th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black rounded-tr-lg pl-1"></th>
                    <th className="border-r-1 border-t-1 border-b-1 border-gray-400 text-black rounded-tr-lg pl-1"></th>
                </tr>
            </thead>
        }
        </> 
    )
}

export default DisplayHeader;