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
        const result = await db.query("SELECT * FROM coletas");
        res.send(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    
})

app.get("/done", (req, res) => {
    console.log(req.body);
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


try {
    app.listen({ port: port, host: '0.0.0.0' });
    console.log(`Server running on port ${port}`);
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}
