import express from 'express';
import userController from './Controllers/userController.js'
import genreController from './Controllers/genreController.js'
import actorController from './Controllers/actorController.js'
import directorController from './Controllers/directorController.js'
import movieController from './Controllers/movieController.js'
<<<<<<< HEAD
import loginController from './Controllers/loginController.js'
=======
>>>>>>> f70022339cd68efdf496e64ce8a69db508162f73

const routes = express();

routes.use('/users', userController);
routes.use('/genre', genreController);
routes.use('/actor', actorController);
routes.use('/director', directorController);
<<<<<<< HEAD
routes.use('/movie', movieController);
routes.use('/login', loginController)
=======
routes.use('/movie', movieController)
>>>>>>> f70022339cd68efdf496e64ce8a69db508162f73

export default routes;
