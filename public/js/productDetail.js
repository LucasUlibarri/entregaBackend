document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('add-to-cart-btn');

    button.addEventListener('click', async () => {
        const pid = button.dataset.pid;
        let cid = sessionStorage.getItem('cartId');

        try {
            if (cid) {
                const checkRes = await fetch(`/api/carts/${cid}`);
                if (!checkRes.ok) {
                    sessionStorage.removeItem('cartId');
                    cid = null;
                }
            }
            if (!cid) {
                const cartRes = await fetch('/api/carts', {
                    method: 'POST'
                });
                const cartData = await cartRes.json();
                cid = cartData.payload._id;
                sessionStorage.setItem('cartId', cid);
            }

            const addRes = await fetch(`/api/carts/${cid}/products/${pid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: 1 })
            });

            const addData = await addRes.json();
            if (addRes.ok) {
                console.log('Producto agregado al carrito con éxito!');
            } else {
                alert(`Error: ${addData.message}`);
            }
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            alert('Ocurrió un error al agregar al carrito.');
        }
    });
});