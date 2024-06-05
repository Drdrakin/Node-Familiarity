import express from 'express';
import serviceActor from '../services/actorService.js'

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => {  
    const {actorName, sex, birthDate} = request.body;

    try{
        if(actorName.length < 1 || sex.length < 1 || birthDate.length < 1){
            return response.status(400).send({message: "Erro: Preencha todos os campos corretamente"})
        }
        await serviceActor.createActor(actorName, sex, birthDate)
        return response.status(201).send({message: "Dados do ator cadastrados com sucesso"});
    } catch{
        return response.status(500).send({message: "Erro interno"})
    }
})

routes.get('/', async (request, response) => {
    const actors = await serviceActor.listActor();
    try{
        if (actors.length == 0){
            return response.status(204).send({message: "Não há atores cadastrados"})
        }
        return response.status(200).send({message: actors})
    } catch{
        return response.status(500).send({message: "Erro interno"})
    }
})

routes.get('/deletedActors', async (request, response) => {
    const deletedActors = await serviceActor.listDeletedActor();

    try{
        if (deletedActors.length == 0){
            return response.status(204).send({message: "Não existe atores deletados na base"})
        }

        return response.status(200).send({message: deletedActors})
    } catch{
        return response.status(500).send({message: "Erro interno"})
    }
})

routes.put('/', async (request, response) =>{
    const {actorName, sex, birthDate} = request.body;

    try{
        if(actorName < 1 || sex > 1 || birthDate < 1){
            return response.status(400).send({message: "Os dados inseridos são inválidos"})
        }

        await serviceActor.updateActor(actorName, sex, birthDate)
        return response.status(200).send({message:"Dados atualizados com sucesso"})
    } catch{
        return response.status(500).send({message: "Erro interno"})
    }
})

routes.delete('/:id_actors', async (request, response) =>{
    const {id_actors} = request.params;

    try{
        if(id_actors < 1){
            return response.status(400).send({message: "Os dados inseridos são inválidos"})
        }
        await serviceActor.hardDeleteActor(id_actors);
        return response.status(200).send({message: "Ator deletado FISICAMENTE com sucesso"})
    } catch{
        return response.status(500).send({message: "Erro interno"})
    }
})

routes.delete('/softdelete/:id_actors', async (request, response) =>{
    const {id_actor} = request.params;

    try{
        await serviceActor.softDeleteActor(id_actor);
        return response.status(200).send({message: "Ator deletado logicamente com sucesso"})

    } catch{
        return response.status(500).send({message: "Erro interno"})
    }
})

routes.get('/specific/:id_ator', async (request, response) => {

    const {id_ator} = request.params;

    try{
        const ator = await serviceActor.listSpecificActor(id_ator);

        if (ator.length < 1)
        {
            return response.status(204).send({message:"Nenhum cadastro encontrado"})
        }
        return response.status(200).send({message: ator})
    } catch{
        return response.status(500).send({message: "Erro interno"})
    }
})

export default routes;