import Product from '../models/product.model.js';

const getAllProducts = async(req, res) => {
    try {
        const {limit = 10, page = 1} = req.query;
        
        const products = await Product.paginate({}, {limit, page});
        res.status(200).json({status: 'success', payload: products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.pid);
        if(!product) return res.status(404).json({status: 'error', message:'Producto no encontrado'});
        res.status(200).json({status: 'success', payload: product});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createProduct = async(req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({status: 'success', payload: newProduct});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const updateProduct = async(req, res) => {
    try {
        const {pid} = req.params;
        const updatedData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(pid, updatedData, {new: true});
        if(!updatedProduct) return res.status(404).json({status: 'error', message: 'Producto no encontrado'});

        res.status(200).json({status: 'success', payload: updatedProduct});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async(req, res) => {
    try {
        const {pid} = req.params

        const deletedProduct = await Product.findByIdAndDelete(pid);
        if(!deletedProduct) return res.status(404).json({status: 'error', message: 'Producto no encontrado'});

        res.status(200).json({status: 'success', payload: deletedProduct});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Agregar  Query y Sort

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};