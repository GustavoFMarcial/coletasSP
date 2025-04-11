import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config'
import pg from "pg";

const port = process.env.PORT || 3000;

const app = Fastify();


console.log(process.env.DATABASE_URL);
const { Pool } = pg;
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
      },
})

async function connectDB() {
    try{
        await db.connect();
    }
    catch (err) {
        console.error(err);
    }
}
connectDB();

await app.register(cors, {
    origin: [
      "https://coletas-sp.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});

function logTime(label) {
    console.time(label);
    return () => console.timeEnd(label);
  }

app.get("/", async (req, res) => {
    const end = logTime("GET /");
    try {
        const result = await db.query("SELECT * FROM coletas ORDER BY id ASC");
        res.send(result.rows);
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
    try {
        await db.query("INSERT INTO coletas (company, date, product) VALUES($1, $2, $3)", [req.body.company, req.body.date, req.body.product]);
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

app.post("/done", async (req, res) => {
    try {
        const end = logTime("POST /done");
        const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
        await db.query("INSERT INTO coletasfeitas (company, date, product) VALUES($1, $2, $3)", [result.rows[0].company, result.rows[0].date, result.rows[0].product]);
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
    try {
        const end = logTime("POST /delete");
        const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
        await db.query("INSERT INTO coletasdeletadas (company, date, product) VALUES($1, $2, $3)", [result.rows[0].company, result.rows[0].date, result.rows[0].product]);
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
    try {
        await db.query("UPDATE coletas SET company = $1, date = $2, product = $3 WHERE id = $4", [req.body.company, req.body.date, req.body.product, req.body.input]);
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

try {
    app.listen({ port: port, host: '0.0.0.0' });
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}