import express from 'express';
import userController from './Controllers/userController.js'

const routes = express();

<<<<<<< HEAD
routes.use('/users', userController);
=======
routes.use('./user', userController);
>>>>>>> 1515261d383f709deba51a59f4a197f4cacae3be

export default routes;
