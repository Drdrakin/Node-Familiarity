import express from 'express';
import serviceDirector from '../services/directorService.js'

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => {  
    const {directorName, nationality, birthDate, sex} = request.body;

    console.log(">>>>> Director: ", directorName);
    console.log(">>>>> Nationality: ", nationality);
    console.log(">>>>> Birthdate: ", birthDate);
    console.log(">>>>> Sex: ", sex);

    if(directorName.length < 1 || nationality.length < 1 || birthDate.length < 1 || sex.lenght < 1){
        return response.status(400).send({message: "Erro: Preencha todos os campos corretamente"})
    }

    await serviceDirector.createDirector(directorName, nationality, birthDate, sex)
    return response.status(201).send({message: "Dados do diretor cadastrados com sucesso"});
})

routes.get('/', async (request, response) => {
    const directors = await serviceDirector.listDirector();

    if (directors.length == 0){
        response.status(204).send({message: "Não há diretores cadastrados"})
    }
    response.status(200).send({message: directors})
})

routes.get('/deletedDirectors', async (request, response) => {
    const deletedDirectors = await serviceDirector.listDeletedDirector();

    if (deletedDirectors.length == 0){
        response.status(204).send({message: "Não existe diretores deletados na base"})
    }

    response.status(200).send({message: deletedDirectors})
})

routes.put('/', async (request, response) =>{
    const {directorName, nationality, birthDate, sex, id_director} = request.body;

    await serviceDirector.updateDirector(directorName, nationality, birthDate, sex, id_director)
    return response.status(200).send({message:"Dados atualizados com sucesso"})

})

routes.delete('/:id_director', async (request, response) =>{
    const {id_director} = request.params;

    await serviceDirector.hardDeleteDirector(id_director);
    return response.status(200).send({message: "Diretor deletado FISICAMENTE com sucesso"})
})

routes.delete('/softdelete/:id_director', async (request, response) =>{
    const {id_director} = request.params;

    await serviceDirector.softDeleteDirector(id_director);
    return response.status(200).send({message: "Diretor deletado logicamente com sucesso"})
})

routes.get('/specific/:id_director', async (request, response) => {

    const {id_director} = request.params;

    const diretor = await serviceDirector.listSpecificDirector(id_director);

    if (diretor.length < 1)
    {
        response.status(204).send({message:"Nenhum cadastro encontrado"})
    }
    response.status(200).send({message: diretor})
})

export default routes;