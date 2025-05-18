import { useState } from "react";

function DisplayFilter({toCollectFilter, collectedFilter, approveFilter, deletedCollectsFilter}) {
    const [buttonColor, setButtonColor] = useState({
        collect: "#A5B0B6",
        collected: "#EBE8DB",
        approve: "#EBE8DB",
        deleted: "#EBE8DB",
    });

    function handleClick(event) {
        setButtonColor({[event.target.name]: "#A5B0B6"});
    }

    return (
        <div className="filter-container">
            <button style={{backgroundColor: buttonColor.collect}} onMouseDown={handleClick} onClick={toCollectFilter} name="collect">A coletar</button>
            <button style={{backgroundColor: buttonColor.collected}} onMouseDown={handleClick} onClick={collectedFilter} name="collected">Coletas feitas</button>
            <button style={{backgroundColor: buttonColor.approve}} onMouseDown={handleClick} onClick={approveFilter} name="approve">Coletas a aprovar</button>
            <button style={{backgroundColor: buttonColor.deleted}} onMouseDown={handleClick} onClick={deletedCollectsFilter} name="deleted">Coletas deletadas</button>
        </div>
    )
}

export default DisplayFilter;   