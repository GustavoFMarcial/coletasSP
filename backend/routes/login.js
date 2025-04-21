import db from "../index.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

async function login(app, _) {
    app.get("/login", async (req, res) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if ( !token ) return res.send("NT").status(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, _) => {
                if (err) return res.send("IT").status(403);
                return res.send("VT").status(200);
            })
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
        
    })

    app.post("/login", async (req, res) => {
        try {
            const result = await db.query("SELECT * FROM contas WHERE login = ($1) AND password = ($2)", [req.body.login, req.body.password]);
            if (result.rows.length > 0) {
                const accessToken = jwt.sign({ user: req.body.login }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
                res.header("authorization", accessToken)
               .header("Access-Control-Expose-Headers", "authorization")
               .status(200)
            }
            if (result.rows.length == 0) {
                res.status(401).send("Credenciais incorretas");
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro no servidor");
        }
    })
}

export default login;