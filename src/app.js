import express from 'express'
import CartManager from './CartManager.js';
import ProductManager from './ProductManager.js';

const app = express();
app.use(express.json());

const cartManager = new CartManager();
const productManager = new ProductManager();

//endpoints


//----------API/PRODUCTS---------//

//getProducts
app.get('/api/products', async(req, res) => {
    const products = await productManager.getProducts();
    res.status(200).json({products, message: 'Listado de productos'})
})

//getProductById
app.get('/api/products/:pid', async(req, res) => {
    const pid = parseInt(req.params.pid)
    const products = await productManager.getProductById(pid);
    res.status(200).json({products, message: 'Producto'})
})

//addProduct
app.post('/api/products', async(req, res) => {
    const newProduct = req.body;
    const products = await productManager.addProduct(newProduct);

    res.status(201).json({products, message: 'Nuevo producto creado'});
})

//actualizar un producto
app.put('/api/products/:pid', async(req, res) => {
    const pid = parseInt(req.params.pid);
    const updatedData = req.body;
    const products = await productManager.updateProductById(pid, updatedData);
    res.status(200).json({products, message: 'Producto actualizado'})
})

//eliminar el producto seleccionado
app.delete('/api/products/:pid', async(req, res) => {
    const pid = parseInt(req.params.pid);
    const products = await productManager.deleteProductById(pid);
    res.status(200).json({products, message: 'Producto eliminado'})
})

//------ API/CART------------//

//addCart
app.post('/api/carts', async(req, res) => {
    const carts = await cartManager.addCart();
    res.status(201).json({carts, message: 'Nuevo carrito creado'});
});

//getProductsInCartById
app.get('/api/carts/:cid', async(req, res) => {
    const cid = req.params.cid;
    const products = await cartManager.getProductsInCartById(cid);
    //resolver el prodcuts con postman
    res.status(200).json({products, message: 'Lista de productos'});
});

//addProductInCart
app.post('/api/carts/:cid/product/:pid', async(req, res) => {
    const cid = req.params.cid;
    const pid = parseInt(req.params.pid)
    const quantity = req.body.quantity;

    const carts = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({carts, message: 'Nuevo producto añadido'});
});

//-------- puerto ------

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});