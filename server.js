const express = require('express');
const app = express();

const port = 8888;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("compito.db");



app.get('/biglietti', (req, res) => {
    db.all(`SELECT * FROM biglietto`, (error, rows) => {
        if(error) {
            console.error(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(error.response);
        }
        response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});

app.get('/biglietto/:id', (req, res) => {
    const id = req.params.id;
    db.all(`SELECT * FROM biglietto WHERE id=?`, id, (error, rows) => {
        if(error){
            console.log(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});

app.put('/biglietto/:id', (req, res) => {
    const id = req.params.id;
    db.run(`UPDATE biglietto SET venduto = 1 WHERE id = ?`, id, (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(201).send(response);
    });
});

app.delete('/biglietto/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM biglietto WHERE id = ?`, id, (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(200).send(response);
    });
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.post('/biglietto', (req, res) => {
    if (!req.body.id){
        const error = "No id specified";
        response = {
            "code": -1,
            "data": error
        }
        res.status(400).send(response);
    }
    const id = req.body.id;
    console.log(id);
    db.run(`INSERT INTO biglietto (id) VALUES (?)`, id, (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(201).send(response);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});