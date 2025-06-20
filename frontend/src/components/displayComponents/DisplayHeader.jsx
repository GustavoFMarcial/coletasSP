function DisplayHeader({ readOnly }) {

    return (
        <>
        {readOnly ?
            <thead>
                <tr>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Usuário</th>
                    <th className="border-t-1 border-r-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Cadastro</th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Fornecedor</th>
                    <th className="border-l-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Data</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Material</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Volume</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Peso (kg)</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Pedido</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Loja</th>
                </tr>
            </thead>
        :
            <thead>
                <tr>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Usuário</th>
                    <th className="border-t-1 border-r-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Cadastro</th>
                    <th className="border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Fornecedor</th>
                    <th className="border-l-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Data</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Material</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Volume</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Peso (kg)</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Pedido</th>
                    <th className="border-x-1 border-t-1 border-b-1 border-gray-400 text-black pl-1 min-w-[150px]">Loja</th>
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
