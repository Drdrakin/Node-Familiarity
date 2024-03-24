import express from 'express';
import routes from './routes.js';

const server = express();

server.use(express.json());

server.use('/', routes);

server.listen(3333, ()=>{
<<<<<<< HEAD
    console.log("")
    console.log("Servidor está rodando....")
    console.log("")
});
=======
    console.log("Servidor está rodando")
})
>>>>>>> 1515261d383f709deba51a59f4a197f4cacae3be

