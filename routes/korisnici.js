import express from "express"
import { readFile } from "fs";
import fs from "fs/promises"
const router = express.Router();

//2

async function citaj() {
    try {
        const data = await fs.readFile("data.json", "utf8")
        const korisnik = JSON.parse(data)
        return korisnik

        
    } catch(error) {
        console.log(error)
    }
}

router.get("/korisnici", async (req, res) => {
    let filter_i = req.query.ime
    let filter_p = req.query.prezime

try {
    let korisnik = await citaj();

    if(filter_i) {
        korisnik = korisnik.filter(k => k.ime === filter_i )
    }

    if(filter_p) {
        korisnik = korisnik.filter(k => k.prezime === filter_p )
    }

    res.status(200).json(korisnik)
} catch (error) {
    res.status(400).send("ne radi")
}
})



 async function pohrana(korisnici) {
    try {
        await fs.writeFile("data.json", JSON.stringify(korisnici), "utf8")
    } catch(error) {
        return console.error
    }
}

//3
router.put("/korisnici", async (req, res) => {
const korisnik = req.body;
//let kljucevi = Object.keys(korisnik)

/*const atributi = ["id", "ime", "prezime"]

for(let at of atributi){
    if(!kljucevi.includes(at)){
        return res.status(400).send(`Greška! Nedostaje atribut: ${at}`);
    }
}
*/


try {
    const data = await fs.readFile("data.json", "utf8")
    const korisnici = JSON.parse(data)

    let idd = korisnici.length;
    while(korisnici.find(i => i.id == idd)) {
        idd++;
    }

    korisnik.id = idd;
    korisnici.push(korisnik)
    /*if(korisnici.find(k => k.id == korisnik.id)) {
        res.status(400).send("ID vec postoji")
        return
    }*/

    


    pohrana(korisnici);
    res.status(200).send("OK")

} catch (error) {
    res.status(400).send("Bad Request")
}
})



router.get("/korisnici/:id", async (req,res) => {
    let id = req.params.id
    try {
        let data = await fs.readFile("data.json", "utf8")
        let korisnici = JSON.parse(data)

        let korisnik = korisnici.find(k => k.id == id)

    let message = `Uspješno dohvaćen korisnik s ID-em ${id}`


        if(!korisnik) {
            res.status(404).send("Ne postoji taj id")
        }
        
        res.status(200).json({korisnik, message:message})
        
        
    } catch(error) {
        res.status(400).send("Bad Request")
    }
})



export default router