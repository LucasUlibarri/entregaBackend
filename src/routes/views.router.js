import express from 'express';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';

const viewsRouter = express.Router();

viewsRouter.get('/', async(req, res) => {
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const products = await Product.paginate({}, {limit, page, lean: true});
        
        res.render('home', {...products});
    }catch(error){
        res.status(500).send({message: error.message})
    }
});

viewsRouter.get('/realtimeproducts', async(req, res) => {
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.params.limit);

        const products = await Product.paginate({}, {limit, page, lean: true});

        res.render('realTimeProducts', {...products});
    }catch(error){
        res.status(500).send({message: error.message})
    }
});

viewsRouter.get('/products/:pid', async(req, res) => {
    try{
        const pid = req.params.pid
        const product = await Product.findById(pid).lean();

        if(!pid) return res.status(404).json({status: 'error', message: 'Producto no encontrado'})
        
        res.render('productDetail', {...product});
    }catch(error){
        res.status(500).send({message: error.message})
    }
});

viewsRouter.get('/carts/:cid', async(req, res) => {
    try {
        const cid = req.params.cid
        const cart = await Cart.findById(cid).populate('products.product');

        if(!cid) return res.status(404).json({status: 'error', message: 'Carrito no encontrado'});
        
        const processedProducts = cart.products.map(item => ({
            ...item.product.toObject(),      
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity,
        }));
        res.render('cartDetail', {cid, products: processedProducts});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

export default viewsRouter;