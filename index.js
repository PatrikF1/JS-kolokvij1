import express from "express";
import Korisnici from "./routes/korisnici.js"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let ime = "Patrik"
let prezime = "Fabijanic"

//1

app.get("/", (req, res) => {
    res.send(`Pozdrav, ${ime} ${prezime}`)
})

app.get("/korisnici", Korisnici);

app.put("/korisnici", Korisnici);

app.get("/korisnici/:id", Korisnici);

app.get('/protected', (req, res) => {
    const userApiKey = req.query.api_key; 

    
    if (userApiKey === process.env.API_KEY) {
        res.status(200).send("Super secret protected content!!!");
    } else {
        res.status(403).send("Pristup nije dozvoljen.");
    }
});


app.listen(PORT, error => {
    console.log("sve radi valjda")
})