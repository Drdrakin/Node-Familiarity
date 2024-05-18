import express from 'express';
import routes from './routes.js';

const server = express();

server.use(express.json());

server.use('/', routes);

server.listen(3333, ()=>{
    console.log("")
    console.log("Servidor está rodando....")
    console.log("")
});

