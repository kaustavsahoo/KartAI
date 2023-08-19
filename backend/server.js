import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';


const app = express();

app.use(express.json());

app.use(routes);

import { dbUrl } from './config.js';

mongoose.connect(dbUrl, {
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
