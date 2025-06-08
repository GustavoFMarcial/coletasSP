import db from "../index.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
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
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                company: { type: "string" },
                date: { type: "string" },
                product: { type: "string" },
                username: { type: "string" },
                volume: { type: "integer" },
                weight: { type: "integer" },
                order: { type: "integer" },
              },
              required: ["id", "company", "date", "product", "username"],
            }
          },
          count: { type: "integer" },
        },
        required: ["data", "count"],
      }
    }
  }
}

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.send("NT").status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, _) => {
        if (err) return res.send("IT").status(403);
    })

    next();
}

async function collects(app, _) {
    app.get("/:filter", { preHandler: verifyToken, schema: getOptions.schema }, async (req, res) => {
        const end = logTime("GET /");
        const filter = ["coletas", "coletasfeitas", "coletasdeletadas", "coletasaprovar"];
        try {
            if (filter.includes(req.query.filter)) {
                const countQuery = `SELECT COUNT(*) FROM ${req.query.filter}`;
                const dataQuery = `SELECT * FROM ${req.query.filter} ORDER BY id ASC LIMIT 10 OFFSET ${req.query.page == 1 ? 0 : (req.query.page * 10) - 10}`;
                const result = await db.query(dataQuery);
                const resultCount = await db.query(countQuery);
                res.status(200).send({data: result.rows, count: Number(resultCount.rows[0].count) == 0 ? 1 : Number(resultCount.rows[0].count)});
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
    
    app.post("/add", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /add");
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const volumeAndWeightRegex = /^(0|[1-9][0-9]{0,11})$/;
        const orderRegex = /^(0|[1-9][0-9]{0,11})$/;
        console.log(req.body.data);
        try {
            if (companiesArray.includes(req.body.data.company)) {
                if (dateRegex.test(req.body.data.date)) {
                    if (productsArray.includes(req.body.data.product)) {
                        if (volumeAndWeightRegex.test(req.body.data.volume)) {
                            if (volumeAndWeightRegex.test(req.body.data.weight)) {
                                if (orderRegex.test(req.body.data.order)) {
                                    await db.query(`INSERT INTO coletasaprovar (company, date, product, username, volume, weight, "order") VALUES($1, $2, $3, $4, $5, $6, $7)`, [req.body.data.company, req.body.data.date, req.body.data.product, req.body.collaborator.name, req.body.data.volume, req.body.data.weight, req.body.data.order]);
                                    res.status(201).send("ok");
                                }
                                if (orderRegex.test(req.body.data.order)) {
                                    res.status(404).send("Pedido deve ser positivo, inteiro e no máximo 12 dígitos");
                                } 
                            }
                            if (!volumeAndWeightRegex.test(req.body.data.weight)) {
                            res.status(404).send("Peso deve ser positivo, inteiro e no máximo 12 dígitos");
                            }
                        }
                        if (!volumeAndWeightRegex.test(req.body.data.volume)) {
                            res.status(404).send("Volume deve ser positivo, inteiro e no máximo 12 dígitos");
                        }
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
    
    app.post("/done", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /done");
        try {
            if (req.body.filter == "coletas") {
                const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
                await db.query(`INSERT INTO coletasfeitas (company, date, product, username, volume, weight, "order") VALUES($1, $2, $3, $4, $5, $6, $7)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order]);
                res.status(200).send("ok");
            }
            if (req.body.filter == "coletasaprovar") {
                const result = await db.query("DELETE FROM coletasaprovar WHERE id = ($1) RETURNING *", [req.body.itemId]);
                await db.query(`INSERT INTO coletas (company, date, product, username, volume, weight, "order") VALUES($1, $2, $3, $4, $5, $6, $7)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order]);
                res.status(200).send("ok");
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
    
    app.post("/delete", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /delete");
        try {
            if (req.body.filter == "coletas") {
                const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
                await db.query(`INSERT INTO coletasdeletadas (company, date, product, username, volume, weight, "order") VALUES($1, $2, $3, $4, $5, $6, $7)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order]);
                res.status(200).send("ok");
            }
            if (req.body.filter == "coletasaprovar") {
                const result = await db.query("DELETE FROM coletasaprovar WHERE id = ($1) RETURNING *", [req.body.itemId]);
                await db.query(`INSERT INTO coletasdeletadas (company, date, product, username, volume, weight, "order") VALUES($1, $2, $3, $4, $5, $6, $7)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order]);
                res.status(200).send("ok");
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
    
    app.post("/edit", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /edit");
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        console.log("/edit route", req.body.filter);
        console.log("/edit route", req.body.input);
        try {
            if (companiesArray.includes(req.body.input.company)) {
                if (dateRegex.test(req.body.input.date)) {
                    if (productsArray.includes(req.body.input.product)) {
                        if (req.body.filter == "coletas") {
                            await db.query(`UPDATE coletas SET company = $1, date = $2, product = $3, username = $4, volume = $5, weight = $6, "order" = $7 WHERE id = $8`, [req.body.input.company, req.body.input.date, req.body.input.product, req.body.collaborator.name, req.body.input.volume, req.body.input.weight, req.body.input.order, req.body.input.id ]);
                            const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
                            await db.query(`INSERT INTO coletasaprovar (company, date, product, username, volume, weight, "order") VALUES($1, $2, $3, $4, $5, $6, $7)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order]);
                            res.status(200).send("ok");
                        }
                        if (req.body.filter == "coletasaprovar") {
                            await db.query(`UPDATE coletasaprovar SET company = $1, date = $2, product = $3, username = $4, volume = $5, weight = $6, "order" = $7 WHERE id = $8`, [req.body.input.company, req.body.input.date, req.body.input.product, req.body.collaborator.name, req.body.input.volume, req.body.input.weight, req.body.input.order, req.body.input.id]);
                            res.status(201).send("ok");
                        }
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