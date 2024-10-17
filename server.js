const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/playerRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/playersDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/player', playerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});