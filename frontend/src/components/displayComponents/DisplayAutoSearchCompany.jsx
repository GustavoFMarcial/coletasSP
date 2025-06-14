import axios from "axios";
import { useState, useEffect } from "react";

function DisplayAutoSearchCompany({ autoSearch, input, handleClick }) {
    const baseURL = "http://201.54.17.248:3000";
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getCompanies() {
            try {
                // const result = await axios.get("https://coletassp.onrender.com/companies");
                const result = await axios.get(`${baseURL}/companies`);
                setCompanies(result.data);
            }
            catch (err) {
                console.error(err);
                window.alert(err);
            }
        }

        getCompanies();
    }, []);

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