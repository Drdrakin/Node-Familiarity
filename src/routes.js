import express from 'express';
import userController from './Controllers/userController.js'
import genreController from './Controllers/genreController.js'
import actorController from './Controllers/actorController.js'
import directorController from './Controllers/directorController.js'

const routes = express();

routes.use('/users', userController);
routes.use('/genre', genreController);
routes.use('/actor', actorController);
routes.use('/director', directorController);


export default routes;
