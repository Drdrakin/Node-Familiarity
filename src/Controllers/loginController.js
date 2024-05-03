import express, { request } from 'express';
import service from '../services/loginService.js';

const routes = express.Router();

routes.post('/login', async (request,response) => {  
    const {email, password} = request.body;

   
    const bankPassword = await service.passwordUser(email);

    console.log(bankPassword);
    console.log(password);
    
    if(bankPassword[0].senha == password){
        return response.status(201).send({message: "Usuário logado com sucesso"});
    }
    else{
        return response.status(400).send({message: "Senha ou email inválidos"})
    }
    
})

export default routes;