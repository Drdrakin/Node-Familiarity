import express, { request } from 'express';
import service from '../services/loginService.js';
import jwt from '../middleware/jwt.js';

const routes = express.Router();

routes.post('/', async (request,response) => {  
    const {emailFront, passwordFront} = request.body;
    try{
        const bankData = await service.passwordUser(emailFront);
        
        if(passwordFront.length < 8){
            return response.status(400).send({message: "A senha deve conter mais de 8 catacteres"})
        }
        if(!emailFront.includes('@')){
            return response.status(400).send({message: "Email inválido"})
        }

        if(bankData[0].senha == passwordFront){

            const data = await service.dataUser(emailFront);

            const token = jwt.createTokenJWT(data);
            
            return response.status(201).send({message: "Usuário logado com sucesso", token});
        }
        else{
            return response.status(400).send({message: "Senha ou email inválidos"})
        }
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

export default routes;