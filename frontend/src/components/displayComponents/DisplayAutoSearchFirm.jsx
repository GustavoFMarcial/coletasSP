import axios from "axios";
import { useState, useEffect } from "react";

function DisplayAutoSearchFirm({ autoSearch, input, handleClick }) {
    const baseURL = "/api";
    const [firm, setFirm] = useState([]);

    useEffect(() => {
        async function getFirm() {
            try {
                // const result = await axios.get("https://coletassp.onrender.com/firm");
                const result = await axios.get(`${baseURL}/firm`);
                setFirm(result.data);
            }
            catch (err) {
                console.error(err);
                window.alert(err);
            }
        }

        getFirm();
    }, []);

    return (
        <>
            <ul className="autosearch" style={{visibility: autoSearch ? "visible" : "hidden"}}>
                {firm.sort().filter((item) => item.toLowerCase().includes(input.loja.toLowerCase()))
                .map((item, index) => 
                    <textarea onClick={handleClick} key={index} value={item} name="loja" readOnly>{item}</textarea>
                )
                }
            </ul>  
        </> 
    )
}

export default DisplayAutoSearchFirm;