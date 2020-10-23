const express = require('express');
const router = express.Router();
const db = require('../../db/database');

//gets all of the parties
router.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Sucess!',
            data: rows
        });
    });
});

//gets a single party
router.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
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

//deletes a single party
router.delete('/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) { //db.run because we don't want to return a result
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }
    
        res.json({ message: 'Darn deleted', changes: this.changes });
    });
});

module.exports = router;