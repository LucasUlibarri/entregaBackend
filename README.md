# Entrega Final Backend 1

## Descripción
Servidor Node.js con Express, MongoDB y Handlebars para gestión de productos y carritos.

## Tecnologías
- Node.js  
- Express  
- MongoDB (Mongoose)  
- Handlebars  
- mongoose-paginate-v2  

## Instalación
1. Clonar el repositorio
2. Ejecutar `npm install`

## Variables de entorno
Crear un archivo `.env` en la raíz con el siguiente contenido:

PORT=8080  
URI_MONGODB=<tu_connection_string>

## Scripts
- `npm run dev`  → Ejecuta el servidor con Nodemon  
- `npm start`    → Ejecuta el servidor en modo producción  

## Endpoints API

### Productos
- GET /api/products  
- GET /api/products/:pid  
- POST /api/products  
- PUT /api/products/:pid  
- DELETE /api/products/:pid  

### Carrito
- POST /api/carts  
- GET /api/carts/:cid  
- POST /api/carts/:cid/products/:pid  
- DELETE /api/carts/:cid/products/:pid  
- DELETE /api/carts/:cid  

## Vistas con Handlebars
- `/` → Página principal con productos paginados  
- `/products/:pid` → Detalle del producto  
- `/carts/:cid` → Detalle del carrito  

## Estructura de archivos

├── .env
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── public
│   └── js
│       ├── cart.js
│       ├── header.js
│       ├── index.js
│       └── productDetail.js
└── src
    ├── app.js
    ├── config
    │   └── db.js
    ├── controllers
    │   ├── carts.controller.js
    │   └── products.controller.js
    ├── models
    │   ├── cart.model.js
    │   └── product.model.js
    ├── routes
    │   ├── cart.router.js
    │   ├── products.router.js
    │   └── views.router.js
    └── views
        ├── cartDetail.handlebars
        ├── home.handlebars
        ├── layouts
        │   └── main.handlebars
        ├── partials
        │   ├── header.handlebars
        │   └── productCard.handlebars
        ├── productDetail.handlebars
        └── realTimeProducts.handlebars


## Funcionalidades
- CRUD completo de productos y carritos  
- Paginación, filtrado y ordenamiento por categoría y precio  
- Vistas dinámicas con Handlebars y uso de parciales  
- Agregar productos al carrito desde la vista de detalle  
- Vista de carrito con ítems, subtotales y total  