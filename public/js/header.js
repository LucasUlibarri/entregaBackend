document.addEventListener('DOMContentLoaded', () => {
    const link = document.getElementById('cart-link');
    const cid  = sessionStorage.getItem('cartId');
  
    if (cid) {
      link.href = `/carts/${cid}`;
    } else {
      link.href = '/';
    }
});