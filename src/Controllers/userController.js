import express from 'express';
import service from '../services/userService.js'

const routes = express.Router();

//Método referente ao cadastro de usuários
//Esses request,response são padrões que as vezes aparecem
//apenas como um (req,res) pois são nomes de variáveis
routes.post('/', async (request,response) => {  
    try{
        const {email, name, password, user_type} = request.body;

        if(password.length < 8){
            return response.status(400).send({message: "A senha deve conter mais de 8 catacteres"})
        }
        if(!email.includes('@')){
            return response.status(400).send({message: "Email inválido"})
        }
        if(name.length < 1){
            return response.status(400).send({message: "Nome inválido"})
        }
        
        await service.createUser(email, name, password, user_type);
        return response.status(201).send({message: "Usuário cadastrado com sucesso"});
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

//Método referente ao GET => que significa busca, é possível joga-lo no navegador também
routes.get('/', async (request,response) => {
    try{
        const bankUsers = await service.listUser();

        if (bankUsers.length < 1)
        {
            return response.status(204).send({message:"204 Nenhum cadastro encontrado"})
        }
        return response.status(200).send({message: bankUsers})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.get('/deletedUsers', async (request,response) => {
    try{
        const deletedUsers = await service.listDeletedUser();

        if (deletedUsers == null)
        {
            return response.status(204).send({message:"Nenhum usuario deletado encontrado"})
        }
        return response.status(200).send({message: deletedUsers})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.put('/', async (request,response) => {
    try{
        const {email, name, password, user_type, user_id} = request.body;

        if (email.length < 1){
            return response.status(400).send({message: "Email não pode ser nulo"})
        }
        if (name.length < 1){
            return response.status(400).send({message: "Nome não pode ser nulo"})
        }
        if (password.length < 1){
            return response.status(400).send({message: "Senha não pode ser nula"})
        }

        await service.updateUser(email, name, password, user_type, user_id);
        return response.status(201).send({message: "Dados atualizados com sucesso"});
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.delete('/softDelete/:user_id', async (request, response) => {
    try{
        const {user_id} = request.params;

        await service.softDeleteUser(user_id);
        return response.status(200).send({message: "Usuário deletado com sucesso"})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.delete('/:user_id', async (request, response) => {
    try{
        const {user_id} = request.params;

        console.log("Id do Usuário deletado para sempre: ", user_id)

        await service.hardDeleteUser(user_id);
        return response.status(200).send({message: "Usuário deletado FISICAMENTE com sucesso"})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.get('/specific/:user_id', async (request, response) => {
    try{
        const {user_id} = request.params;

        const user = await service.listSpecificUser(user_id);

        if (user.length < 1)
        {
            return response.status(204).send({message:"Nenhum cadastro encontrado"})
        }
        return response.status(200).send({message: user})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

export default routes;
