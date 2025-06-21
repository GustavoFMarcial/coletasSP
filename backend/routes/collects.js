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
                created_at: { type: "string" },
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
        const { filter } = req.query;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * 10;
        try {
            if (filterArray.includes(filter)) {
                const countQuery = `SELECT COUNT(*) FROM coletas WHERE status = $1`;
                const dataQuery = 'SELECT * FROM "coletas" WHERE status = $1 ORDER BY id ASC LIMIT 10 OFFSET $2';
                const values = [filter, offset];
                const result = await db.query(dataQuery, values);
                const resultCount = await db.query(countQuery, [values[0]]);
                return res.status(200).send({data: result.rows, count: Number(resultCount.rows[0].count) == 0 ? 1 : Number(resultCount.rows[0].count)});
            }   
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor.");
        }
        finally {
            end();
        }
    })
    
    app.post("/api/add", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /add");
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const numberRegex = /^(0|[1-9][0-9]{0,11})$/;
        const { company, date, product, volume, weight, order_number, branch, } = req.body.data;
        const { name } = req.body.collaborator;

        try {
            if (!companiesArray.includes(company)) {
                return res.status(400).send("Coloque um nome de empresa válido.");
            }
            if (!dateRegex.test(date)) {
                return res.status(400).send("Coloque uma data válida, por exemplo: DD/MM/AAAA.");
            }
            if (!productsArray.includes(product)) {
                return res.status(400).send("Coloque um nome de material válido.");
            }
            if (!numberRegex.test(volume)) {
                return res.status(400).send("Volume deve ser positivo, inteiro e no máximo 12 dígitos.");
            }
            if (!numberRegex.test(weight)) {
                return res.status(400).send("Peso deve ser positivo, inteiro e no máximo 12 dígitos.");
            }
            if (!numberRegex.test(order_number)) {
                return res.status(400).send("Pedido deve ser positivo, inteiro e no máximo 12 dígitos.");
            }
            if (!branchArray.includes(branch)) {
                return res.status(400).send("Coloque um nome de loja válido.");
            }
            await db.query(
                `INSERT INTO coletas (company, date, product, username, volume, weight, order_number, branch, status) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, 
                [company, date, product, name, volume, weight, order_number, branch, "coletasaprovar"]
            );
            return res.status(201).send({ message: "Coleta adicionada com sucesso." });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor.");
        }
        finally {
            end();
        }
    })
    
    app.post("/api/done", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /done");
        const { filter, itemId, } = req.body;
        try {
            if (filter == "coletas") {
                await db.query("UPDATE coletas SET status = ($1) WHERE id = ($2)", ["coletasfeitas", itemId]);
                return res.status(200).send({ message: "Coleta concluída com sucesso." });
            }
            if (filter == "coletasaprovar") {
                await db.query("UPDATE coletas SET status = ($1) WHERE id = ($2)", ["coletas", itemId]);
                return res.status(200).send({ message: "Coleta aprovada com sucesso." });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor.");
        }
        finally {
            end();
        }
    })
    
    app.post("/api/delete", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /delete");
        const { itemId } = req.body;
        try {
            await db.query("UPDATE coletas SET status = ($1) WHERE id = ($2)", ["coletasdeletadas", itemId]);
            return res.status(200).send({ message: "Coleta deletada com sucesso." });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor.");
        }
        finally {
            end();
        }
    })
    
    app.post("/api/edit", { preHandler: verifyToken }, async (req, res) => {
        const end = logTime("POST /edit");
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const numberRegex = /^(0|[1-9][0-9]{0,11})$/;
        const { company, date, product, volume, weight, branch, order_number, id, } = req.body.input;
        const { name } = req.body.collaborator;

        try {
            if (!companiesArray.includes(company)) {
                return res.status(400).send("Coloque um nome de empresa válido.");
            }
            if (!dateRegex.test(date)) {
                return res.status(400).send("Coloque uma data válida, por exemplo: DD/MM/AAAA.")
            }
            if (!productsArray.includes(product)) {
                return res.status(400).send("Coloque um nome de material válido.");
            }
            if (!numberRegex.test(volume)) {
                return res.status(400).send("Volume deve ser positivo, inteiro e no máximo 12 dígitos.");
            }
            if (!numberRegex.test(weight)) {
                return res.status(400).send("Peso deve ser positivo, inteiro e no máximo 12 dígitos.");
            }
            if (!numberRegex.test(order_number)) {
                return res.status(400).send("Pedido deve ser positivo, inteiro e no máximo 12 dígitos.");
            }
            if (!branchArray.includes(branch)) {
                return res.status(400).send("Coloque um nome de loja válido.");
            }
            await db.query(
                `UPDATE coletas SET company = $1, date = $2, product = $3, username = $4, volume = $5, weight = $6, order_number = $7, branch = $8, status = $9 WHERE id = $10`,
                [company, date, product, name, volume, weight, order_number, branch, "coletasaprovar", id]
            );
            return res.status(201).send({ message: "Coleta editada com sucesso." });
            }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor.");
        }
        finally {
            end();
        }
    })
}

export default collects;