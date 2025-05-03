import { useState } from "react";

function DisplayFilter({toCollectFilter, collectedFilter, deletedCollectsFilter}) {
    const [buttonColor, setButtonColor] = useState({
        collect: "#EBE8DB",
        collected: "#EBE8DB",
        deleted: "#EBE8DB",
    });

    function handleClick(event) {
        setButtonColor({[event.target.name]: "#A5B0B6"});
    }

    return (
        <div className="filter-container">
            <button style={{backgroundColor: buttonColor.collect}} onMouseDown={handleClick} onClick={toCollectFilter} name="collect">A coletar</button>
            <button style={{backgroundColor: buttonColor.collected}} onMouseDown={handleClick} onClick={collectedFilter} name="collected">Coletas feitas</button>
            <button style={{backgroundColor: buttonColor.deleted}} onMouseDown={handleClick} onClick={deletedCollectsFilter} name="deleted">Coletas deletadas</button>
        </div>
    )
}

export default DisplayFilter;   