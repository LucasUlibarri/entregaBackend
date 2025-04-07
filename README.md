# 📦 Entrega N°1 - Servidor de Productos y Carritos

## 📝 Descripción General
Este proyecto consiste en un servidor hecho con **Node.js** y **Express** que permite gestionar un catálogo de productos y carritos de compra.  
Los datos se almacenan en archivos `.json` utilizando el módulo `fs`.

## ⚙️ Requisitos Técnicos
- Node.js
- Express
- File System (fs)

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone [URL-del-repo]
   cd [nombre-del-proyecto]
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor:
   ```bash
   node src/app.js
   ```
   El servidor se inicia en el puerto `8080`.

## 📁 Estructura del Proyecto

```
/src
├── app.js
├── ProductManager.js
├── CartManager.js
├── products.json
└── carts.json
```

## 🧪 Endpoints disponibles

### 🔸 Productos - `/api/products`

#### `GET /api/products`
Devuelve el listado completo de productos.

#### `GET /api/products/:pid`
Devuelve un producto según su ID.

#### `POST /api/products`
Crea un nuevo producto. El ID se autogenera.  
**Body requerido:**
```json
{
  "title": "string",
  "description": "string",
  "code": "string",
  "price": number,
  "status": true,
  "stock": number,
  "category": "string",
  "thumbnails": ["string"]
}
```

#### `PUT /api/products/:pid`
Actualiza un producto por ID (excepto su `id`).

#### `DELETE /api/products/:pid`
Elimina un producto según su ID.

---

### 🔹 Carritos - `/api/carts`

#### `POST /api/carts`
Crea un nuevo carrito vacío.

#### `GET /api/carts/:cid`
Devuelve los productos del carrito con el ID solicitado.

#### `POST /api/carts/:cid/product/:pid`
Agrega un producto al carrito.  
Si el producto ya existe, se incrementa la cantidad.  
**Body requerido:**
```json
{
  "quantity": number
}
```

---

## 🧠 Consideraciones

- El ID de los productos y carritos se autogenera de forma incremental.
- Los productos no se repiten en el carrito, se incrementa su cantidad si ya existen.
- La información persiste en los archivos `products.json` y `carts.json`.
- La app no tiene frontend, por lo que se recomienda testear con Postman o similar.
- El código está modularizado y separado en archivos para mayor claridad.

## 👨‍💻 Autor
Lucas Ulibarri
# entregaBackend
