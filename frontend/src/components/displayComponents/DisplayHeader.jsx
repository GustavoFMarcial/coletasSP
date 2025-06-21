function DisplayHeader({ readOnly }) {
    const style = "border border-gray-400 text-black pl-1 min-w-[150px]";

    return (
        <>
        {readOnly ?
            <thead>
                <tr>
                    <th className={style}>Usuário</th>
                    <th className={style}>Cadastro</th>
                    <th className={style}>Fornecedor</th>
                    <th className={style}>Data</th>
                    <th className={style}>Material</th>
                    <th className={style}>Volume</th>
                    <th className={style}>Peso (kg)</th>
                    <th className={style}>Pedido</th>
                    <th className={style}>Loja</th>
                </tr>
            </thead>
        :
            <thead>
                <tr>
                    <th className={style}>Usuário</th>
                    <th className={style}>Cadastro</th>
                    <th className={style}>Fornecedor</th>
                    <th className={style}>Data</th>
                    <th className={style}>Material</th>
                    <th className={style}>Volume</th>
                    <th className={style}>Peso (kg)</th>
                    <th className={style}>Pedido</th>
                    <th className={style}>Loja</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        }
        </> 
    )
}

export default DisplayHeader;
