const socket = io();

const formNewProduct = document.getElementById('formNewProduct');
const productsList = document.getElementById('productsList')


formNewProduct.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formNewProduct);
    const productData = {};

    formData.forEach((value, key) => {
        productData[key] = value;
    });

    //envio de datos del producto al server
    socket.emit('newProduct', productData);
});

socket.on('productAdded', (newProduct) => {
    productsList.innerHTML += `<li data-id="${newProduct.id}"> ${newProduct.title} - $${newProduct.price} <button class="deleteProductBtn">Eliminar</button></li>`;
});

productsList.addEventListener('click', (event) => {
    if(event.target.classList.contains('deleteProductBtn')){
        const productId = event.target.parentElement.getAttribute('data-id');

        socket.emit('deleteProduct', productId)
    }
});

socket.on('productDeleted', (productId) => {
    const liToDelete = document.querySelector(`li[data-id="${productId}"]`);
    if(liToDelete){
        liToDelete.remove();
    }
});