const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const sqlite3 = require('sqlite3').verbose();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//this will connect to the database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Ya'll connected to the election datadase.");
});

//get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//get single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates
                WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// //create candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [12, 'Lou', 'Reed', 1];
// db.run(sql, params, function(err, result) {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result, this.lastID);
// })

//delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({ error: res.message});
            return;
        }
        res.json({
            message: 'successfully deleted',
            changes: this.changes
        });
    });
});

//this must always be last because it will override all the others
//response for not found catch all!
app.use((req, res) => {
    res.status(404).end();
});

//starts the express server //after the database connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server runnin' on port ${PORT}!`);
    });
});
