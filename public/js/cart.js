document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.remove-btn');
  
    buttons.forEach(button => {
      button.addEventListener('click', async () => {
        const pid = button.getAttribute('data-pid');
        const cid = window.location.pathname.split('/').pop();
  
        try {
          const res = await fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'DELETE'
          });
  
          if (res.ok) {
            location.reload();
          } else {
            const error = await res.json();
            console.error('Error eliminando producto:', error.message);
            alert('No se pudo eliminar el producto');
          }
        } catch (err) {
          console.error('Error al hacer la solicitud:', err);
        }
      });
    });

    const clearBtn = document.getElementById('clear-cart-btn');
    clearBtn.addEventListener('click', async () => {
      const cid = clearBtn.dataset.cid;
      try {
        const res = await fetch(`/api/carts/${cid}`, {
          method: 'DELETE'
        });
  
        if (res.ok) {
          alert('Carrito vaciado correctamente');
          window.location.reload();
        } else {
          const err = await res.json();
          console.error('Error vaciando carrito:', err.message);
          alert('No se pudo vaciar el carrito');
        }
      } catch (error) {
        console.error('Error al hacer la solicitud DELETE /api/carts/:cid:', error);
        alert('Ocurrió un error al vaciar el carrito.');
      }
    });


  });
  