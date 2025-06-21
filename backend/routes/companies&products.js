export const companiesArray = ["GMS", "RT Colors", "Potência", "Kaitos", "Papel Safra", "AL Industria", "C&A", "Glasspack", "UHP", "Floresta"];
export const productsArray = ["Ferragem", "Alumínio", "Plástico Bolha", "Cantoneira", "Abrasivo", "Puxador", "Kit box", "Separador"];
export const branchArray = ["Gênesis", "Luz"];

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
    app.get("/api/companies", getOptions, (req, res) => {
        const end = logTime("GET /companies");
        try {
            return res.status(200).send(companiesArray);
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })

    app.get("/api/products", getOptions, (req, res) => {
        const end = logTime("GET /products");
        try {
            return res.status(200).send(productsArray);
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })

    app.get("/api/branch", getOptions, (req, res) => {
        const end = logTime("GET /branch");
        try {
            return res.status(200).send(branchArray);
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })
}

export default companiesAndProducts;
