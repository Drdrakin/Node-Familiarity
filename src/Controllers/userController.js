import express from 'express';
import service from '../services/userService.js'

const routes = express.Router();

//Método referente ao GET => que significa busca
routes.get('/', (request,response) => {
    return response.status(200).send('Comunicação Backend e Front concluída')
})

//Método referente ao cadastro de usuários
//Esses request,response são padrões que as vezes aparecem
//apenas como um (req,res) pois são nomes de variáveis
routes.post('/', async (request,response) => {  
    const {email, name, password, user_type} = request.body;

    console.log(">>>>> email: ", email)
    console.log(">>>>> name: ", name)
    console.log(">>>>> password: ", password)
    console.log(">>>>> user type: ", user_type)

    if(password.lenght < 5){
        return response.status(400).send({message: "A senha deve conter mais de 5 catacteres"})
    }

    await service.createUser(email, name, password, user_type);

    return response.status(201).send({message: "Usuário cadastrado com sucesso"});
})

export default routes;
