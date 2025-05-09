import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const productsRouter = express.Router();

//endpoints
//Todos los productos
productsRouter.get('/', getAllProducts);
//1 Producto x id
productsRouter.get('/:pid', getProductById);
//Crear producto
productsRouter.post('/', createProduct);
//Actualizar producto
productsRouter.put('/:pid', updateProduct);
//Eliminar producto
productsRouter.delete('/:pid', deleteProduct);

export default productsRouter;