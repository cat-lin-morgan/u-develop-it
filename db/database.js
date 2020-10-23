const sqlite3 = require('sqlite3').verbose();

//this will connect to the database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Ya'll connected to the election datadase.");
});

module.exports = db;