import dotenv from 'dotenv';
import express from 'express'
import { engine } from "express-handlebars";
import http from 'http';
import connectMongoDB from './config/db.js';
import productsRouter from './routes/products.router.js'; 
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import path from 'path';
import { fileURLToPath } from 'url';

//inicializando variables de entorno
dotenv.config();

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

connectMongoDB();

//endpoints
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

//inicio Server
server.listen(PORT, () => console.log(`Servidor iniciado en: http://localhost:${PORT}`));