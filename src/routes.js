import express from 'express';
import userController from './Controllers/userController.js'

const routes = express();

routes.use('./user', userController);

export default routes;
