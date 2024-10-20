const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json());

app.get("/", (req, res) => {
    response(200, "API V1 ready to go", "SUCCESS", res)
})


app.get("/mahasiswa", (req, res) => {
    const sql = `SELECT * FROM mahasiswa`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        response(200, result, "SUCCESS", res)
    })
})

app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        response(200, result, "get detail mahasiswa", res)
    })
})

app.post('/mahasiswa', (req, res) => {
    const { nim,nama, kelas , alamat} = req.body
    const sql = `INSERT INTO mahasiswa (nim, nama, kelas, alamat) VALUES (${nim}, '${nama}', '${kelas}', '${alamat}')`
    
    db.query(sql, (err, result) => {
        if (err) response(500, "Invalid", "error", res)
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId
            }
            response(200, data, "SUCCESS", res)
        }         
        
    })
     
})


app.put('/mahasiswa', (req, res) => {
    const { nim, nama, kelas, alamat } = req.body
    const sql = `UPDATE mahasiswa SET nama = '${nama}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`
    db.query(sql, (err, result) => {
        if (err) response(500, "Invalid", "error", res)
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                message : result.message
            }
            response(200, data, "Update success", res)
        } else {
            response(500, "Mohon Maaf", "error", res)
        }
    })

})


app.delete('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim
    const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, result) => {
        if (err) response(500, "Invalid", "error", res)
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                message : result.message
            }
            response(200, data, "Delete success", res)
        } else {
            response(500, "Mohon Maaf", "error", res)
        }
    })
    
})





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})