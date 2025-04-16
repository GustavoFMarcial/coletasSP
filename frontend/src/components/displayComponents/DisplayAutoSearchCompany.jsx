import axios from "axios";
import { useState } from "react";

function DisplayAutoSearchCompany({autoSearch, input, handleClick}) {
    const [companies, setCompanies] = useState([]);

    async function getCompanies() {
        try {
            await axios.get("https://coletassp.onrender.com/companies");
            // const result = await axios.get("http://localhost:3000/companies");
            setCompanies(result.data);
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }
    getCompanies();

    return (
        <>
            <ul className="autosearch" style={{visibility: autoSearch ? "visible" : "hidden"}}>
                {companies.sort().filter((item) => item.toLowerCase().includes(input.company.toLowerCase()))
                .map((item, index) => 
                    <textarea onClick={handleClick} key={index} value={item} name="company" readOnly>{item}</textarea>
                )
                }
            </ul>  
        </> 
    )
}

export default DisplayAutoSearchCompany;