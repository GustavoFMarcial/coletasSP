import db from "../index.js";
import { companiesArray } from "./companies&products.js";
import { productsArray } from "./companies&products.js";

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
                    type: "object",
                    properties: {
                        id: { type: "integer"},
                        company: { type: "string" },
                        date: { type: "string" },
                        product: { type: "string"},
                        username: { tyle: "string"},
                    }
                }
            }
        }
    }
}

async function collects(app, _) {
    app.get("/:filter", getOptions, async (req, res) => {
        const end = logTime("GET /");
        const filter = ["coletas", "coletasfeitas", "coletasdeletadas"];
        try {
            if (filter.includes(req.query.filter)) {
                const query = `SELECT * FROM ${req.query.filter} ORDER BY id ASC`;
                const result = await db.query(query);
                res.status(200).send(result.rows);
            }   
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })
    
    app.post("/add", async (req, res) => {
        const end = logTime("POST /add");
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        console.log(req.body.collaborator.name);
        try {
            if (companiesArray.includes(req.body.data.company)) {
                if (dateRegex.test(req.body.data.date)) {
                    if (productsArray.includes(req.body.data.product)) {
                        await db.query("INSERT INTO coletas (company, date, product, username) VALUES($1, $2, $3, $4)", [req.body.data.company, req.body.data.date, req.body.data.product, req.body.collaborator.name]);
                        res.status(201).send("ok");
                    }
                    if (!productsArray.includes(req.body.product)) {
                        res.status(404).send("Coloque um nome de produto válido");
                    }
                }
                if (!dateRegex.test(req.body.date)) {
                    res.status(404).send("Coloque uma data válida, por exemplo: DD/MM/AAAA");
                }
            }
            if (!companiesArray.includes(req.body.company)) {
                res.status(404).send("Coloque um nome de empresa válido");
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })
    
    app.post("/done", async (req, res) => {
        const end = logTime("POST /done");
        console.log(req.body);
        try {
            const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
            console.log(result.rows);
            await db.query("INSERT INTO coletasfeitas (company, date, product, username) VALUES($1, $2, $3, $4)", [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username]);
            res.status(200).send("ok");
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })
    
    app.post("/delete", async (req, res) => {
        const end = logTime("POST /delete");
        try {
            const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
            await db.query("INSERT INTO coletasdeletadas (company, date, product, username) VALUES($1, $2, $3, $4)", [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username]);
            res.status(200).send("ok");
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
        finally {
            end();
        }
    })
    
    app.post("/edit", async (req, res) => {
        const end = logTime("POST /edit");
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        try {
            if (companiesArray.includes(req.body.input.company)) {
                if (dateRegex.test(req.body.input.date)) {
                    if (productsArray.includes(req.body.input.product)) {
                        await db.query("UPDATE coletas SET company = $1, date = $2, product = $3, username = $4 WHERE id = $5", [req.body.input.company, req.body.input.date, req.body.input.product, req.body.collaborator.name, req.body.input.id ]);
                        res.status(201).send("ok");
                    }
                    if (!productsArray.includes(req.body.product)) {
                        res.status(404).send("Coloque um nome de produto válido");
                    }
                }
                if (!dateRegex.test(req.body.date)) {
                    res.status(404).send("Coloque uma data válida, por exemplo: DD/MM/AAAA")
                }
            }
            if (!companiesArray.includes(req.body.company)) {
                res.status(404).send("Coloque um nome de empresa válido");
            }
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

export default collects;