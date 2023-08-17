const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

const dbURL = require('./config').dbURL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.error(error);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
