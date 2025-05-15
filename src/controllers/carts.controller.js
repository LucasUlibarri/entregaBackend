import Cart from "../models/cart.model.js";

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
        res.status(500).json({message: error.message});
    }
};

const addProductToCart = async(req, res) => {
    try {
        const {cid, pid} = req.params;
        const {quantity = 1} = req.body;

        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({status: 'error', message: 'Carrito no encontrado'});

        const productInCart = cart.products.find(p => p.product.toString() === pid);

        if(productInCart){
            productInCart.quantity += quantity;
        }else{
            cart.products.push({product: pid, quantity});
        }

        await cart.save();

        res.status(200).json({status: 'success', payload: cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const removeProduct = async(req, res) => {
    try {
        const {cid, pid} = req.params

        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({status: 'error', message: 'Carrito no econtrado'});
        
        const initialLength = cart.products.length;
        cart.products = cart.products.filter(p => p.product.toString() !== pid);

        if (cart.products.length === initialLength)
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });

        await cart.save();
        res.status(200).json({status: 'success', payload: cart})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
  
      const cart = await Cart.findById(cid);
      if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
  
      cart.products = products.map(item => ({
        product: item.product,
        quantity: item.quantity
      }));
  
      await cart.save();
      res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({message: error.message });
    }
  };

  const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid} = req.params;
        const { quantity } = req.body;


        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({status: 'error', message: 'Carrito no encontrado'});

        const product = cart.products.find(p => p.product.toString() === pid);
        if(!product) return res.status(404).json({status: 'error', message: 'Producto no encontrado'});

        product.quantity = quantity;
        await cart.save();

        res.status(200).json({status: 'success', payload: cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  };

  const clearCart = async (req, res) => {
    try {
      const { cid } = req.params;
  
      const cart = await Cart.findById(cid);
      if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
  
      cart.products = [];
      await cart.save();
      res.status(200).json({ status: 'success', message: 'Carrito vaciado' });
    } catch (error) {
      res.status(500).json({message: error.message });
    }
  };

export { addCart, getCart, addProductToCart, removeProduct, updateCart, updateProductQuantity, clearCart};