import axios from "axios";
import { useState } from "react";

function DisplayAutoSearchProduct({autoSearch, input, handleClick}) {
    const [products, setCompanies] = useState([]);

    async function getProducts() {
        try {
            await axios.post("https://coletassp.onrender.com/products");
            // const result = await axios.get("http://localhost:3000/products");
            setCompanies(result.data);
        }
        catch (err) {
            console.error(err);
            window.alert(err);
        }
    }
    getProducts();

    return (
        <>
            <ul className="autosearch" style={{visibility: autoSearch ? "visible" : "hidden"}}>
                {products.sort().filter((item) => item.toLowerCase().includes(input.product.toLowerCase()))
                .map((item, index) => 
                    <textarea onClick={handleClick} key={index} value={item} name="product" readOnly>{item}</textarea>
                )
                }
            </ul>  
        </> 
    )
}

export default DisplayAutoSearchProduct;