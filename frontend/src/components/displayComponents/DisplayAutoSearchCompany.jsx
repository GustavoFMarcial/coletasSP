function DisplayAutoSearchCompany({autoSearch, input, handleClick}) {
    const companiesArray = ["GMS", "RT Colors", "Potência", "Kaitos", "Papel Safra"];
    const companySearch = input.company || "";

    return (
        <>
            <ul className="autosearch" style={{visibility: autoSearch ? "visible" : "hidden"}}>
                {companiesArray.sort().filter((item) => item.toLowerCase().includes(companySearch.toLowerCase()))
                .map((item, index) => 
                    <textarea onClick={handleClick} key={index} value={item} name="company" readOnly>{item}</textarea>
                )
                }
            </ul>  
        </> 
    )
}

export default DisplayAutoSearchCompany;