import express from 'express';
import { getAllProducts } from '../controllers/products.controller.js';

const viewsRouter = express.Router();

viewsRouter.get('/', async(req, res) => {
    try{
        const page = parseInt(req.query.page);
        const limit = 10;

        const products = await getAllProducts({limit, page, lean: true});
        
        res.render('home', {products});
    }catch(error){
        res.status(500).send({message: error.message})
    }
});

viewsRouter.get('/realtimeproducts', async(req, res) => {
    try{
        const page = parseInt(req.query.page);
        const limit = 10;

        const products = await getAllProducts({limit, page, lean: true});

        res.render('realTimeProducts', {products});
    }catch(error){
        res.status(500).send({message: error.message})
    }
});

export default viewsRouter;