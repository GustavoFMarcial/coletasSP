import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config'
import pg from "pg";
import collects from './routes/collects';
import companiesAndProducts from "./routes/companies&products";
import login from './routes/login';

const port = process.env.PORT || 3000;

const app = Fastify();

// const { Pool } = pg;
// const db = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,
//       },
// })

console.log({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const { Pool } = pg;
const db = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

// const { Client } = pg;pm2 logs nome-do-processo
// const db = new Client ({
//     user: "postgres",
//     password: "169542",
//     host: "localhost",
//     port: 5432,
//     database: "coletasSP",
// })

// async function connectDB() {
//     try{
//         await db.connect();
//         console.log("Conectado ao banco de dados");
//     }
//     catch (err) {
//         console.error(err);
//     }
// }
// connectDB();

await app.register(cors, {
    origin: [
    //   "https://coletas-sp.vercel.app",
        "http://localhost:5173",
        "http://201.54.17.248:5173",
        "http://201.54.17.248",
        "http://operantus.com.br",
        "http://www.operantus.com.br",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
app.register(collects);
app.register(companiesAndProducts);
app.register(login);

try {
    app.listen({ port: port, host: '0.0.0.0' });
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}

export default db;