import axios from "axios";
import { useState, useEffect } from "react";

function DisplayAutoSearchProduct({ autoSearch, input, handleClick }) {
    const baseURL = "https://operantus.com.br/api";
    const [products, setCompanies] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                // const result = await axios.get("https://coletassp.onrender.com/products");
                const result = await axios.get(`${baseURL}/products`);
                setCompanies(result.data);
            }
            catch (err) {
                console.error(err);
                window.alert(err);
            }
        }

        getProducts();
    }, []);

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