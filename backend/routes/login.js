import db from "../index.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import bcrypt from 'bcrypt';

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.send("NT").status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, _) => {
        if (err) return res.send("IT").status(403);
    })

    next();
}

async function login(app, _) {
    app.get("/api/login", async (req, res) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if (!token) return res.send("NT").status(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, _) => {
                if (err) return res.send("IT").status(403);
                return res.send("VT").status(200);
            })
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor.");
        }
    })

    app.post("/api/login", async (req, res) => {
        const { login, password, } = req.body; 
        try {
            if (login.length === 0) return res.status(401).send("Credenciais incorretas.");
            const result = await db.query("SELECT * FROM contas WHERE login = ($1)", [login]);
            const hash = result.rows[0].password;
            const compare = await bcrypt.compare(password, hash);
            if (compare) {
                const accessToken = jwt.sign({ user: login }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
                res
                .header("authorization", accessToken)
                .header("name", result.rows[0].name)
                .header("role", result.rows[0].role)
                .header("Access-Control-Expose-Headers", ["authorization", "name", "role"])
                .status(200);
                return;
            }
            if (!compare) {
                return res.status(401).send("Credenciais incorretas.");
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor.");
        }
    })

    app.post("/api/password", { preHandler: verifyToken}, async (req, res) => {
        const { input, name, role, } = req.body;
        console.log(req.body);
        try {
            if (!input || input == "") {
                throw new Error("A senha não pode ser em branco.");
            }
            if (input.length <= 5) {
                throw new Error("A senha deve ter mais de 5 caracteres.");
            }
            const saltRounds = 12;
            const plainPassword = input;
            const hash = await bcrypt.hash(plainPassword, saltRounds);
            await db.query("UPDATE contas SET password = ($1) WHERE name = ($2) AND role = ($3)", [hash, name, role]);
        }
        catch (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
    })
}

export default login;