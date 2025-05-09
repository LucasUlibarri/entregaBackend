import Cart from "../models/cart.model";

const addCart = async(req, res) => {
    try {
        const cart = new Cart();
        await cart.save()
        res.status(201).json({status: "success", payload: cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getCart = async(req, res) => {
    try {
        const cid = req.params.cid;
        
        const cart = await Cart.findOne({_id: cid}).populate('products.product');
        if(!cart) return res.status(404).json({status: 'error', message: 'Carrito no encontrado'});

        res.status(200).json({status: 'success', payload: cart.products});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

//Agregar condicional de que si existe no cree uno nuevo sino incremente
const addProductToCart = async(req, res) => {
    try {
        const {cid, pid} = req.params;
        const {quantity} = req.body;

        const updatedCart = await Cart.findOneAndUpdate({_id: cid}, { $push: { products: {product: pid, quantity }}}, {new: true, runValidators: true});
        if(!updatedCart) return res.status(404).json({status: 'error', message: 'Carrito no encontrado'});

        res.status(200).json({status: 'success', payload: updatedCart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


export { addCart, getCart, addProductToCart};