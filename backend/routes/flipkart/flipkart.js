import express from 'express';
import search from './search.js';

const router = express.Router();

router.get('/search/:product', (req, res) => {
    search(req.params.product, 'flipkart.com').then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log("error: error in search")
        res.json(err);
    })
});


export default router;