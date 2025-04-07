import fs from 'fs'

class ProductManager{
    constructor(){
        this.path = './src/products.json'
    }


    generateNewId = (products) => {
        if(products.length > 0){
            return products[products.length - 1].id + 1;
        }else{
            return 1;
        }
    }

    //getProducts
    getProducts = async() => {
        const productsJson = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJson);

        return products
    }

    //getProductById
    getProductById = async(pid) => {
        const productsJson = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJson);

        const product = products.find((productData) => productData.id == pid)
        return product
    }

    //addProduct
    addProduct = async(newProduct) => {
        const productsJson = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJson);

        const id = this.generateNewId(products);
        products.push({ id, ...newProduct });

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
        return products;
    }

    //updateProductById
    updateProductById = async(pid, updatedData) => {
        const productsJson = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJson);
        
        const index = products.findIndex(product => product.id == pid);
        products[index] = {...products[index], ...updatedData};

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
        return products;
    }


    //deleteProductById
    deleteProductById = async(pid) => {
        const productsJson = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJson);
        
        const productsFilter = products.filter((productData) => productData.id != pid);

        await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, null, 2), 'utf-8');
        return productsFilter;
    }


}

export default ProductManager;