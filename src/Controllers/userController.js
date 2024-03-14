import express from 'express';

const routes = express.Router();

routes.get('/', (request,response) => {
    return response.status(200),
    send('Comunicação Backend e Front concluída')
})

export default routes;
