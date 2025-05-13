import dotenv from 'dotenv';
import express from 'express'
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import { engine } from "express-handlebars";
import http from 'http';
import connectMongoDB from './config/db.js';

//inicializando variables de entorno
dotenv.config();

const app = express();
const server = http.createServer(app)


//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

const PORT = process.env.PORT;
app.use(express.json());
app.use(express.static('public'));

connectMongoDB();

//endpoints
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);



//inicio Server
server.listen(PORT, () => console.log(`Servidor iniciado en: http://localhost:${PORT}`));