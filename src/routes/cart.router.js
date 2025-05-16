import express from 'express';
import {addCart, getCart, addProductToCart, removeProduct, updateCart, updateProductQuantity, clearCart} from '../controllers/carts.controller.js';

const cartRouter = express.Router();

//Crear carrito
cartRouter.post('/', addCart);
//Obtener carrito
cartRouter.get('/:cid', getCart);
//Agregar producto al carrtio
cartRouter.post('/:cid/products/:pid', addProductToCart);
//Sacar producto del carrito x ID
cartRouter.delete('/:cid/products/:pid', removeProduct);
// Reemplazar todos los productos del carrito
cartRouter.put('/:cid', updateCart);
// Actualizar cantidad de un producto x ID
cartRouter.put('/:cid/products/:pid', updateProductQuantity);
// Vaciar el carrito completo
cartRouter.delete('/:cid', clearCart);

export default cartRouter;