const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//response for not found catch all!



//this must always be last because it will override all the others
app.use((req, res) => {
    res.status(404).end();
});

//starts the express server
app.listen(PORT, () => {
    console.log(`Server runnin' on port ${PORT}!`);
});