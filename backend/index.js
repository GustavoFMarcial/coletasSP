import Fastify from 'fastify';
import cors from "cors";
import 'dotenv/config'
import pg from "pg";

const port = process.env.SERVER_PORT;

const app = Fastify();

const { Client } = pg;
const db = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
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

await app.register(require('@fastify/express'));
app.use(cors({
    origin: "http://localhost:5173",
}));

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
    console.log(`Server running on port ${port}`);
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}