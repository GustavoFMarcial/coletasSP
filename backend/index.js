import Fastify from 'fastify';
import cors from "cors";
import 'dotenv/config'
import pg from "pg";

const port = process.env.PORT || 3000;

const app = Fastify();

const { Client } = pg;
const db = new Client({
    host: "db.aovdwewnyntxhmapwgqx.supabase.co",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: process.env.PASSWORD,
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

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM coletas ORDER BY id ASC");
        res.send(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    
})

app.post("/add", async (req, res) => {
    try {
        await db.query("INSERT INTO coletas (company, date, product) VALUES($1, $2, $3)", [req.body.company, req.body.date, req.body.product]);
        res.send("ok");
    }
    catch (err) {
        console.error(err);
    }
})

app.post("/done", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
        await db.query("INSERT INTO coletasfeitas (company, date, product) VALUES($1, $2, $3)", [result.rows[0].company, result.rows[0].date, result.rows[0].product]);
        res.send("ok");
    }
    catch (err) {
        console.error(err);
    }
})

app.post("/delete", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM coletas WHERE id = ($1) RETURNING *", [req.body.itemId]);
        await db.query("INSERT INTO coletasdeletadas (company, date, product) VALUES($1, $2, $3)", [result.rows[0].company, result.rows[0].date, result.rows[0].product]);
        res.send("ok");
    }
    catch (err) {
        console.error(err);
    }
})

app.post("/edit", async (req, res) => {
    try {
        await db.query("UPDATE coletas SET company = $1, date = $2, product = $3 WHERE id = $4", [req.body.company, req.body.date, req.body.product, req.body.input]);
        res.send("ok");
    }
    catch (err) {
        console.error(err);
    }
})

try {
    app.listen({ port: port, host: '0.0.0.0' });
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}