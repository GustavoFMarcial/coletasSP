import axios from "axios";
import { useState, useEffect } from "react";

function DisplayAutoSearchBranch({ autoSearch, input, handleClick }) {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [branch, setBranch] = useState([]);

    useEffect(() => {
        async function getBranch() {
            try {
                const result = await axios.get(`${baseURL}/branch`);
                setBranch(result.data);
            }
            catch (err) {
                console.error(err);
                window.alert(err);
            }
        }

        getBranch();
    }, []);

    return (
        <>
            <ul className="autosearch" style={{visibility: autoSearch ? "visible" : "hidden"}}>
                {branch.sort().filter((item) => item.toLowerCase().includes(input.branch.toLowerCase()))
                .map((item, index) => 
                    <textarea onClick={handleClick} key={index} value={item} name="branch" readOnly>{item}</textarea>
                )
                }
            </ul>  
        </> 
    )
}

export default DisplayAutoSearchBranch;