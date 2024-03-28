import express from 'express';
import userController from './Controllers/userController.js'
import genreController from './Controllers/genreController.js'

const routes = express();

routes.use('/users', userController);
routes.use('/genre', genreController);

export default routes;
