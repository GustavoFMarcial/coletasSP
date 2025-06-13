export const companiesArray = ["GMS", "RT Colors", "Potência", "Kaitos", "Papel Safra", "AL Industria", "C&A", "Glasspack", "UHP", "Trans. Floresta"];
export const productsArray = ["Ferragem", "Alumínio", "Plástico Bolha", "Cantoneira", "Abrasivo", "Puxador", "Kit box", "Separador"];
export const firmArray = ["Gênesis", "Luz"];

function logTime(label) {
    console.time(label);
    return () => console.timeEnd(label);
}

const getOptions = {
    schema: {
        response: {
            200: {
                type: "array",
                items: {
                    type: "string",
                }
            }
        }
    }
}

async function companiesAndProducts(app, _) {
    app.get("/companies", getOptions, (req, res) => {
        const end = logTime("GET /companies");
        try {
            res.status(200).send(companiesArray);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })

    app.get("/products", getOptions, (req, res) => {
        const end = logTime("GET /products");
        try {
            res.status(200).send(productsArray);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })

    app.get("/firm", getOptions, (req, res) => {
        const end = logTime("GET /products");
        try {
            res.status(200).send(firmArray);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })
}

export default companiesAndProducts;
