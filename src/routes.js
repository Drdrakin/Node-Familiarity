import express from 'express';
import userController from './Controllers/userController.js'
import genreController from './Controllers/genreController.js'
import actorController from './Controllers/actorController.js'
import directorController from './Controllers/directorController.js'
import movieController from './Controllers/movieController.js'
import loginController from './Controllers/loginController.js'
import moviActorController from './Controllers/movieActorController.js'

const routes = express();

routes.use('/users', userController);
routes.use('/genre', genreController);
routes.use('/actor', actorController);
routes.use('/director', directorController);
routes.use('/movie', movieController);
routes.use('/login', loginController)
routes.use('/movieActor', moviActorController)

export default routes;
