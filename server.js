const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/database');
const apiRoutes = require('./routes/apiRoutes');

// const inputCheck = require('./utils/inputCheck');

//middleware should be first so it can parse the json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//adding router
app.use('/api', apiRoutes); 


//this must always be last because it will override all the others
//response for not found query string parameter
app.use((req, res) => {
    res.status(404).end();
});

//starts the express server //after the database connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server runnin' on port ${PORT}!`);
    });
});
