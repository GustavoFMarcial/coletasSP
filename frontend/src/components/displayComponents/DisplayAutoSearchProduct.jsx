function DisplayAutoSearchProduct({autoSearch, input, handleClick}) {
    const productsArray = ["Ferragem", "Alumínio", "Plástico Bolha", "Cantoneira", "Abrasivo", "Puxador", "Kit box"];

    return (
        <>
            <ul className="autosearch" style={{visibility: autoSearch ? "visible" : "hidden"}}>
                {productsArray.sort().filter((item) => item.toLowerCase().includes(input.product.toLowerCase()))
                .map((item, index) => 
                    <textarea onClick={handleClick} key={index} value={item} name="product" readOnly>{item}</textarea>
                )
                }
            </ul>  
        </> 
    )
}

export default DisplayAutoSearchProduct;