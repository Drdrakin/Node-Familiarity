import express, { request } from 'express';
import service from '../services/loginService.js';

const routes = express.Router();

routes.post('/', async (request,response) => {  
    const {email, password} = request.body;
    try{
        const bankPassword = await service.passwordUser(email);
        
        if(password.length < 8){
            return response.status(400).send({message: "A senha deve conter mais de 8 catacteres"})
        }
        if(!email.includes('@')){
            return response.status(400).send({message: "Email inválido"})
        }

        if(bankPassword[0].senha == password){
            return response.status(201).send({message: "Usuário logado com sucesso"});
        }
        else{
            return response.status(400).send({message: "Senha ou email inválidos"})
        }
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

export default routes;