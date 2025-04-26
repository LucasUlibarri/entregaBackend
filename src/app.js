import express from 'express'
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import { engine } from "express-handlebars";
import { Server } from "socket.io"
import http from 'http';


const app = express();
const server = http.createServer(app)
const io = new Server(server)


//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

const PORT = 8080;
app.use(express.json());
app.use(express.static('public'));


//endpoints
//app.use('/api/products', productsRouter);
//app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

//websockets
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');
})

//inicio Server
server.listen(PORT, () => console.log(`Servidor iniciado en: http://localhost:${PORT}`));