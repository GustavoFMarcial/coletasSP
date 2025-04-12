import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config'
import pg from "pg";
import collects from './routes/collects';

const port = process.env.PORT || 3000;

const app = Fastify();

const { Pool } = pg;
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
      },
})

// const { Client } = pg;
// const db = new Client ({
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     host: process.env.HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DATABASE,
// })

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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

app.register(collects);

try {
    app.listen({ port: port, host: '0.0.0.0' });
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}

export default db;