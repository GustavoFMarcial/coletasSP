import { useState, useEffect } from "react";
import "./Pagination.css";

function Pagination({ tableRows, handlePagination }) {
    const pattern = {};
    const [paginationNumbers, setPaginationNumbers] = useState([]);
    const [buttonColor, setButtonColor] = useState(pattern);

    useEffect(() => {
        for (let i = 1; i <= paginationNumbers.length; i++) {
            pattern["button" + i] = "#EBE8DB";
            if (i == 1) {
                pattern["button" + i] = "#A5B0B6";
            }
        }

        setButtonColor(pattern);
    }, [paginationNumbers])
    
    useEffect(() => {

        if (!tableRows) return;

        function createPagination(tableRows) {
            setPaginationNumbers([]);
            const pages = Math.floor(tableRows / 10);
            for (let i = 1; i <= pages + 1; i++) {
                setPaginationNumbers(p => ([...p, i]));
            }
        }

        createPagination(tableRows);
    }, [tableRows])

    function handleClick(event) {
        setButtonColor({[event.target.name]: "#A5B0B6"});
    }

    return (
        <>
            <div className="pagination-container">
                {paginationNumbers.map((item, index) =>
                    <button onClick={handlePagination} onMouseDown={handleClick} style={{backgroundColor: buttonColor["button" + (index + 1)]}} key={index} value={index + 1} name={`button` + (index + 1)}>{item}</button>
                )}
            </div>
        </>
    )
}

export default Pagination;