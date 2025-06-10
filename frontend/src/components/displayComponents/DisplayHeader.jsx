function DisplayHeader({ readOnly }) {

    return (
        <>
        {readOnly ?
            <thead>
                <tr>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 ">Usuário</th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black pl-1">Empresa</th>
                    <th className="border-l-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Data</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Material</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Volume</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Peso (kg)</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Pedido</th>
                </tr>
            </thead>
        :
            <thead>
                <tr>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Usuário</th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black pl-1">Empresa</th>
                    <th className="border-l-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Data</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Material</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Volume</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Peso (kg)</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1">Pedido</th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black pl-1"></th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black pl-1"></th>
                    <th className="border-r-1 border-t-1 border-b-1 border-gray-400 text-black pl-1"></th>
                </tr>
            </thead>
        }
        </> 
    )
}

export default DisplayHeader;
