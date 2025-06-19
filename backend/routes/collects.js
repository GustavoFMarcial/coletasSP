import db from "../index.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { companiesArray } from "./companies&products.js";
import { productsArray } from "./companies&products.js";
import { branchArray } from "./companies&products.js";

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
                order_number: { type: "integer" },
                branch: { type: "string"},
              },
              required: ["id", "company", "date", "product", "username", "volume", "weight", "order_number", "branch"],
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
    app.get("/api/:filter", { preHandler: verifyToken, schema: getOptions.schema }, async (req, res) => {
        const end = logTime("GET /");
        const filterArray = ["coletas", "coletasfeitas", "coletasdeletadas", "coletasaprovar"];
        const filter = req.query.filter;
        // const page = parseInt(req.query.page) || 1;
        // const offset = (page - 1) * 10;
        const offset = req.query.page == 1 ? 0 : (req.query.page * 10) - 10;
        try {
            if (filterArray.includes(req.query.filter)) {
                const countQuery = `SELECT COUNT(*) FROM coletas WHERE status = $1`;
                // const dataQuery = `SELECT * FROM ${req.query.filter} ORDER BY id ASC LIMIT 10 OFFSET ${req.query.page == 1 ? 0 : (req.query.page * 10) - 10}`;
                const dataQuery = 'SELECT * FROM "coletas" WHERE status = $1 ORDER BY id ASC LIMIT 10 OFFSET $2';
                const values = [filter, offset];
                const result = await db.query(dataQuery, values);
                const resultCount = await db.query(countQuery, [values[0]]);
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
    
    app.post("/api/add", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /add");
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const volumeAndWeightRegex = /^(0|[1-9][0-9]{0,11})$/;
        const orderRegex = /^(0|[1-9][0-9]{0,11})$/;
        const company = req.body.data.company;
        const date = req.body.data.date;
        const product = req.body.data.product;
        const collaborator = req.body.collaborator.name;
        const volume = req.body.data.volume;
        const weight = req.body.data.weight;
        const order_number = req.body.data.order_number;
        const branch = req.body.data.branch;
        try {
            if (companiesArray.includes(company)) {
                if (dateRegex.test(date)) {
                    if (productsArray.includes(product)) {
                        if (volumeAndWeightRegex.test(volume)) {
                            if (volumeAndWeightRegex.test(weight)) {
                                if (orderRegex.test(order_number)) {
                                    if (branchArray.includes(branch)) {
                                        await db.query(`INSERT INTO coletas (company, date, product, username, volume, weight, order_number, branch, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [company, date, product, collaborator, volume, weight, order_number, branch, "coletasaprovar"]);
                                        res.status(201).send("ok");
                                    }
                                    if (!branchArray.includes(branch)) {
                                        res.status(404).send("Coloque um nome de loja válido");
                                    }
                                }
                                if (!orderRegex.test(order_number)) {
                                    res.status(404).send("Pedido deve ser positivo, inteiro e no máximo 12 dígitos");
                                } 
                            }
                            if (!volumeAndWeightRegex.test(weight)) {
                            res.status(404).send("Peso deve ser positivo, inteiro e no máximo 12 dígitos");
                            }
                        }
                        if (!volumeAndWeightRegex.test(volume)) {
                            res.status(404).send("Volume deve ser positivo, inteiro e no máximo 12 dígitos");
                        }
                    }
                    if (!productsArray.includes(product)) {
                        res.status(404).send("Coloque um nome de produto válido");
                    }
                }
                if (!dateRegex.test(date)) {
                    res.status(404).send("Coloque uma data válida, por exemplo: DD/MM/AAAA");
                }
            }
            if (!companiesArray.includes(company)) {
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
    
    app.post("/api/done", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /done");
        const filter = req.body.filter;
        const collectId = req.body.itemId;
        try {
            if (filter == "coletas") {
                await db.query("UPDATE coletas SET status = ($1) WHERE id = ($2)", ["coletasfeitas", collectId]);
                // const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
                // await db.query(`INSERT INTO coletasfeitas (company, date, product, username, volume, weight, order_number, branch) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order_number, result.rows[0].branch]);
                res.status(200).send("ok");
            }
            if (filter == "coletasaprovar") {
                await db.query("UPDATE coletas SET status = ($1) WHERE id = ($2)", ["coletas", collectId]);
                // const result = await db.query("DELETE FROM coletasaprovar WHERE id = ($1) RETURNING *", [req.body.itemId]);
                // await db.query(`INSERT INTO coletas (company, date, product, username, volume, weight, order_number, branch) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order_number, result.rows[0].branch]);
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
    
    app.post("/api/delete", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /delete");
        // const filter = req.body.filter;
        const collectId = req.body.itemId;
        try {
            // if (filter == "coletas") {
            //     const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
            //     await db.query(`INSERT INTO coletasdeletadas (company, date, product, username, volume, weight, order_number, branch) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order_number, result.rows[0].branch]);
            //     res.status(200).send("ok");
            // }
            // if (filter == "coletasaprovar") {
            //     const result = await db.query("DELETE FROM coletasaprovar WHERE id = ($1) RETURNING *", [req.body.itemId]);
            //     await db.query(`INSERT INTO coletasdeletadas (company, date, product, username, volume, weight, order_number, branch) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order_number, result.rows[0].branch]);
            //     res.status(200).send("ok");
            // }
            await db.query("UPDATE coletas SET status = ($1) WHERE id = ($2)", ["coletasdeletadas", collectId]);
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
    
    app.post("/api/edit", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /edit");
        console.log(req.body);
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const volumeAndWeightRegex = /^(0|[1-9][0-9]{0,11})$/;
        const orderRegex = /^(0|[1-9][0-9]{0,11})$/;
        const company = req.body.input.company;
        const date = req.body.input.date;
        const product = req.body.input.product;
        const collaborator = req.body.collaborator.name;
        const volume = req.body.input.volume;
        const weight = req.body.input.weight;
        const order_number = req.body.input.order_number;
        const branch = req.body.input.branch;
        const collectId = req.body.itemId;
        try {
            if (companiesArray.includes(company)) {
                if (dateRegex.test(date)) {
                    if (productsArray.includes(product)) {
                        if (volumeAndWeightRegex.test(volume)) {
                            if (volumeAndWeightRegex.test(weight)) {
                                if (orderRegex.test(order_number)) {
                                    if (branchArray.includes(branch)) {
                                        await db.query(`UPDATE coletas SET company = $1, date = $2, product = $3, username = $4, volume = $5, weight = $6, order_number = $7, branch = $8, status = $9 WHERE id = $10`, [company, date, product, collaborator, volume, weight, order_number, branch, "coletasaprovar", collectId]);
                                        res.status(201).send("ok");
                                        // if (req.body.filter == "coletas") {
                                        //     await db.query(`UPDATE coletas SET company = $1, date = $2, product = $3, username = $4, volume = $5, weight = $6, order_number = $7, branch = $8, status = $9 WHERE id = $10`, [req.body.input.company, req.body.input.date, req.body.input.product, req.body.collaborator.name, req.body.input.volume, req.body.input.weight, req.body.input.order_number, req.body.input.branch, "coletasaprovar", req.body.input.id]);
                                        //     await db.query(`UPDATE coletas SET company = $1, date = $2, product = $3, username = $4, volume = $5, weight = $6, order_number = $7, branch = $8 WHERE id = $9`, [req.body.input.company, req.body.input.date, req.body.input.product, req.body.collaborator.name, req.body.input.volume, req.body.input.weight, req.body.input.order_number, req.body.input.branch, req.body.input.id]);
                                        //     const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
                                        //     await db.query(`INSERT INTO coletasaprovar (company, date, product, username, volume, weight, order_number, branch) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [result.rows[0].company, result.rows[0].date, result.rows[0].product, result.rows[0].username, result.rows[0].volume, result.rows[0].weight, result.rows[0].order_number, result.rows[0].branch]);
                                        //     res.status(200).send("ok");
                                        // }
                                        // if (req.body.filter == "coletasaprovar") {
                                        //     // await db.query(`UPDATE coletasaprovar SET company = $1, date = $2, product = $3, username = $4, volume = $5, weight = $6, order_number = $7, branch = $8 WHERE id = $9`, [req.body.input.company, req.body.input.date, req.body.input.product, req.body.collaborator.name, req.body.input.volume, req.body.input.weight, req.body.input.order_number, req.body.input.branch, req.body.input.id]);
                                        //     await db.query(`UPDATE coletas SET company = $1, date = $2, product = $3, username = $4, volume = $5, weight = $6, order_number = $7, branch = $8, status = $9 WHERE id = $10`, [req.body.input.company, req.body.input.date, req.body.input.product, req.body.collaborator.name, req.body.input.volume, req.body.input.weight, req.body.input.order_number, req.body.input.branch, "coletasaprovar", req.body.input.id]);
                                        //     res.status(201).send("ok");
                                        // }
                                    }
                                    if (!branchArray.includes(branch)) {
                                        res.status(404).send("Coloque um nome de loja válido");
                                    }
                                }
                                if (!orderRegex.test(order_number)) {
                                    res.status(404).send("Pedido deve ser positivo, inteiro e no máximo 12 dígitos");
                                }
                            }
                            if (!volumeAndWeightRegex.test(weight)) {
                                res.status(404).send("Peso deve ser positivo, inteiro e no máximo 12 dígitos");
                            }
                        }
                        if (!volumeAndWeightRegex.test(volume)) {
                            res.status(404).send("Volume deve ser positivo, inteiro e no máximo 12 dígitos");
                        }
                    }
                    if (!productsArray.includes(product)) {
                        res.status(404).send("Coloque um nome de produto válido");
                    }
                }
                if (!dateRegex.test(date)) {
                    res.status(404).send("Coloque uma data válida, por exemplo: DD/MM/AAAA")
                }
            }
            if (!companiesArray.includes(company)) {
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