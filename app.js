const express = require('express');
const mongoose = require('mongoose');
const recipesRouter = require('./routes/recipesRouter');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(recipesRouter);



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Vous avez lancé le serveur sur le port ${process.env.PORT}`);
    }
});


try {
    mongoose.connect(process.env.BDD_URI);
    console.log('Tentative de connexion à la base de données');
} catch (error) {
    console.log(error);
}
