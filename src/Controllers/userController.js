import express from 'express';
import service from '../services/userService.js'

const routes = express.Router();

//Método referente ao cadastro de usuários
//Esses request,response são padrões que as vezes aparecem
//apenas como um (req,res) pois são nomes de variáveis
routes.post('/', async (request,response) => {  
    const {email, name, password, user_type} = request.body;

    console.log(">>>>> email: ", email)
    console.log(">>>>> name: ", name)
    console.log(">>>>> password: ", password)
    console.log(">>>>> user type: ", user_type)

    if(password.length < 5){
        return response.status(400).send({message: "A senha deve conter mais de 5 catacteres"})
    }

    await service.createUser(email, name, password, user_type);

    return response.status(201).send({message: "Usuário cadastrado com sucesso"});
})

//Método referente ao GET => que significa busca, jogue-o no navegador
routes.get('/', async (request,response) => {
    const bankUsers = await service.listUser();

    console.log(bankUsers)

    if (bankUsers.length < 1)
    {
        response.status(204).send({message:"204 Nenhum cadastro encontrado"})
    }
    response.status(200).send({message: bankUsers})
})

routes.put('/', async (request,response) => {
    const {email, name, password, user_type, user_id} = request.body;

    console.log(">>>>> email: ", email)
    console.log(">>>>> name: ", name)
    console.log(">>>>> password: ", password)
    console.log(">>>>> user type: ", user_type)
    console.log(">>>>> user id: ", user_id)

    if (email.length < 1){
        return response.status(400).send({message: "Email não pode ser nulo"})
    }
    if (name.length < 1){
        return response.status(400).send({message: "Nome não pode ser nulo"})
    }
    if (password.length < 1){
        return response.status(400).send({message: "Senha não pode ser nula"})
    }

    await service.updateUser(email, name, password, user_type, user_id)
    return response.status(201).send({message: "Dados atualizados com sucesso"});

})
export default routes;
