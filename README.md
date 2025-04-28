# 📦 Pre-Entrega N°2 – Productos en Tiempo Real con WebSockets

## 📝 Descripción General
En esta segunda pre-entrega hemos extendido la entrega anterior para que la aplicación de **productos y carritos** trabaje en **tiempo real** usando **Socket.IO** y **Handlebars**. Ahora existe una vista dedicada (`/realtimeproducts`) donde:

- Al agregar un producto por formulario, este aparece inmediatamente sin recargar la página.  
- Al eliminar un producto con el botón “Eliminar”, desaparece al instante del listado.

---

## 🔄 Cambios Realizados

1. **Integración de Socket.IO**  
   - En `src/app.js` creamos el servidor HTTP y lo enlazamos a Socket.IO:
     ```js
     const server = http.createServer(app);
     const io = new Server(server);
     ```
   - Agregamos en `io.on('connection')` dos listeners:
     - `newProduct` → llama a `ProductManager.addProduct()` y emite `productAdded`.  
     - `deleteProduct` → llama a `ProductManager.deleteProductById()` y emite `productDeleted`.  

2. **Nueva vista Handlebars `/realtimeproducts`**  
   - Archivo: `src/views/realTimeProducts.handlebars`  
   - Contiene:
     - Un formulario con `id="formNewProduct"` para emitir vía WebSocket.  
     - Un `<ul id="productsList">` que renderiza `{{#each products}}` con `<li data-id="{{this.id}}">…<button class="deleteProductBtn">Eliminar</button>`.  

3. **Router de vistas actualizado**  
   - En `src/routes/views.router.js` se agregó:
     ```js
     router.get('/realtimeproducts', async (req, res) => {
       const products = await productManager.getProducts();
       res.render('realTimeProducts', { products });
     });
     ```

4. **Cliente WebSocket y DOM**  
   - En `public/js/index.js`:
     - Se importó `io()` y se abrió la conexión.  
     - `formNewProduct.submit` → `socket.emit('newProduct', productData)`.  
     - `socket.on('productAdded')` → añade un `<li>` con `data-id` y botón de eliminar.  
     - `productsList.click` → al pulsar `.deleteProductBtn`, emite `deleteProduct`.  
     - `socket.on('productDeleted')` → elimina del DOM el `<li>` correspondiente.  

5. **ProductManager**  
   - Se mantiene la gestión de lectura/escritura en `products.json`.  
   - Solo se agregó el método `deleteProductById(id)` para eliminar un producto por su ID.  

---

## 📁 Estructura del Proyecto (resumida)

/entrega
  /node_modules
  /public
    /js
      index.js                  ← Lógica de Socket.IO y DOM
  /src
    /data
      products.json             ← Base de datos de productos
      carts.json                ← Base de datos de carritos
    /routes
      product.router.js         ← Rutas CRUD de productos
      cart.router.js            ← Rutas CRUD de carritos
      views.router.js           ← Rutas de vistas Handlebars
    /views
      /layouts
        main.handlebars         ← Layout principal
      home.handlebars           ← Vista de catálogo estático
      realTimeProducts.handlebars ← Vista en tiempo real
    app.js                      ← Configuración de Express y Socket.IO
    ProductManager.js           ← Clase para gestionar `products.json`
    CartManager.js              ← Clase para gestionar `carts.json`
  .gitignore
  package.json
  package-lock.json
  README.md


---

## 🚀 Cómo Probarlo

1. Instala dependencias y arranca el servidor:
   ```bash
   npm install
   npm run dev

2. Abre en el navegador:
   Catálogo estático: http://localhost:8080/
   Tiempo real: http://localhost:8080/realtimeproducts

3. Agrega productos desde el formulario:
   Verás el nuevo producto al instante en la lista.

4. Elimina un producto con el botón “Eliminar”:
   Se remueve en tiempo real sin reload.

--

✅ Resumen de la Consigna
✅ Configurar Handlebars y Socket.IO en el mismo servidor.

✅ Crear home.handlebars con lista estática.

✅ Crear realTimeProducts.handlebars trabajando solo con WebSockets.

✅ Formularios y botones que emiten newProduct y deleteProduct.

✅ Actualización automática del DOM con productAdded y productDeleted.

--

👨‍💻 Autor
Lucas Ulibarri