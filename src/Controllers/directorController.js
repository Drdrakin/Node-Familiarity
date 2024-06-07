import express from 'express';
import serviceDirector from '../services/directorService.js'

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => {
    try{
        const {directorName, nationality, birthDate, sex} = request.body;
        if(directorName.length < 1 || nationality.length < 1 || birthDate.length < 1 || sex.lenght < 1){
            return response.status(400).send({message: "Erro: Preencha todos os campos corretamente"})
        }

        await serviceDirector.createDirector(directorName, nationality, birthDate, sex)
        return response.status(201).send({message: "Dados do diretor cadastrados com sucesso"})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.get('/', async (request, response) => {
    try{
        const directors = await serviceDirector.listDirector();
    
        if (directors.length == 0){
            return response.status(204).send({message: "Não há diretores cadastrados"})
        }
        return response.status(200).send({message: directors})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.get('/deletedDirectors', async (request, response) => {
    try{
        const deletedDirectors = await serviceDirector.listDeletedDirector();
        if (deletedDirectors.length == 0){
            return response.status(204).send({message: "Não existe diretores deletados na base"})
        }

        return response.status(200).send({message: deletedDirectors})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.put('/', async (request, response) =>{
    try{
        const {directorName, nationality, birthDate, sex, id_director} = request.body;
        await serviceDirector.updateDirector(directorName, nationality, birthDate, sex, id_director)
        return response.status(200).send({message:"Dados atualizados com sucesso"})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.delete('/:id_director', async (request, response) =>{
    try{
        const {id_director} = request.params;
    
        await serviceDirector.hardDeleteDirector(id_director);
        return response.status(200).send({message: "Diretor deletado FISICAMENTE com sucesso"})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.delete('/softdelete/:id_director', async (request, response) =>{
    try{
        const {id_director} = request.params;
        await serviceDirector.softDeleteDirector(id_director);
        return response.status(200).send({message: "Diretor deletado logicamente com sucesso"})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.get('/specific/:id_director', async (request, response) => {

    try{
        const {id_director} = request.params;

        const diretor = await serviceDirector.listSpecificDirector(id_director);

        if (diretor.length < 1)
        {
            return response.status(204).send({message:"Nenhum cadastro encontrado"})
        }
        return response.status(200).send({message: diretor})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

export default routes;