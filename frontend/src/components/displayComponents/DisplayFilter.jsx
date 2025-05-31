import { useState, useEffect } from "react";

function DisplayFilter({ filter, toCollectFilter, collectedFilter, approveFilter, deletedCollectsFilter }) {
    const buttonsName = ["coletas", "coletasfeitas", "coletasaprovar", "coletasdeletadas"];
    const pattern = {};
    const [buttonColor, setButtonColor] = useState(pattern);

    useEffect(() => {
        for (let i = 0; i < buttonsName.length; i++) {
            pattern[buttonsName[i]] = "#EBE8DB";
            if (buttonsName[i] == filter) {
                pattern[buttonsName[i]] = "#A5B0B6";
            }
        }

        setButtonColor(pattern)
    }, [])

    function handleClick(event) {
        setButtonColor({[event.target.name]: "#A5B0B6"});
    }

    return (
        <div className="filter-container">
            <button style={{backgroundColor: buttonColor.coletas}} onMouseDown={handleClick} onClick={toCollectFilter} name="coletas">A coletar</button>
            <button style={{backgroundColor: buttonColor.coletasfeitas}} onMouseDown={handleClick} onClick={collectedFilter} name="coletasfeitas">Coletas feitas</button>
            <button style={{backgroundColor: buttonColor.coletasaprovar}} onMouseDown={handleClick} onClick={approveFilter} name="coletasaprovar">Coletas a aprovar</button>
            <button style={{backgroundColor: buttonColor.coletasdeletadas}} onMouseDown={handleClick} onClick={deletedCollectsFilter} name="coletasdeletadas">Coletas deletadas</button>
        </div>
    )
}

export default DisplayFilter;   