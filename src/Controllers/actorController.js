import express from 'express';
import serviceActor from '../services/actorService.js'

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => {  
    const {actorName, sex, birthDate} = request.body;

    console.log(">>>>> Ator: ", actorName);
    console.log(">>>>> Sexo: ", sex);
    console.log(">>>>> Birthdate: ", birthDate);

    if(actorName.length < 1 || sex.length < 1 || birthDate.length < 1){
        return response.status(400).send({message: "Erro: Preencha todos os campos corretamente"})
    }
    await serviceActor.createActor(actorName, sex, birthDate)
    return response.status(201).send({message: "Dados do ator cadastrados com sucesso"});
})

routes.get('/', async (request, response) => {
    const actors = await serviceActor.listActor();

    if (actors.length == 0){
        response.status(204).send({message: "Não há atores cadastrados"})
    }
    response.status(200).send({message: actors})
})

routes.get('/deletedActors', async (request, response) => {
    const deletedActors = await serviceActor.listDeletedActor();

    if (deletedActors.length == 0){
        response.status(204).send({message: "Não existe atores deletados na base"})
    }

    response.status(200).send({message: deletedActors})
})

routes.put('/', async (request, response) =>{
    const {actorName, sex, birthDate} = request.body;

    await serviceActor.updateActor(actorName, sex, birthDate)
    return response.status(200).send({message:"Dados atualizados com sucesso"})

})

routes.delete('/:id_actors', async (request, response) =>{
    const {id_actors} = request.params;

    await serviceActor.hardDeleteActor(id_actors);
    return response.status(200).send({message: "Ator deletado FISICAMENTE com sucesso"})
})

routes.delete('/softdelete/:id_actors', async (request, response) =>{
    const {id_actor} = request.params;

    await serviceActor.softDeleteActor(id_actor);
    return response.status(200).send({message: "Ator deletado logicamente com sucesso"})
})

routes.get('/specific/:id_ator', async (request, response) => {

    const {id_ator} = request.params;

    const ator = await serviceActor.listSpecificActor(id_ator);

    if (ator.length < 1)
    {
        response.status(204).send({message:"Nenhum cadastro encontrado"})
    }
    response.status(200).send({message: ator})
})

export default routes;