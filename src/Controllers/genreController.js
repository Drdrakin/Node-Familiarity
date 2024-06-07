import express, { request } from 'express';
import serviceGenre from '../services/genreService.js'

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => { 
    try{
        const {genre} = request.body;
        if(genre.length < 1){
            return response.status(400).send({message: "O genero não pode ser nulo"})
        }

        await serviceGenre.createGenre(genre)
        return response.status(201).send({message: "Genero cadastrado com sucesso"});
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.get('/', async (request, response) => {
    try{
    const genres = await serviceGenre.listGenre();

    if (genres.length == 0){
        return response.status(204).send({message: "Não há generos cadastrados"})
    }
    return response.status(200).send({message: genres})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
    
})

routes.get('/deletedGenres', async (request, response) => {
    try {
        const deletedGenres = await serviceGenre.listDeletedGenre();

        if (deletedGenres.length == 0){
            return response.status(204).send({message: "Não existe generos deletados na base"})
        }

        return response.status(200).send({message: deletedGenres})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.put('/', async (request, response) =>{
    try{
        const {genre, genre_id} = request.body;

        console.log("Genero:", genre)
        console.log("Id do Genero:", genre_id)

        await serviceGenre.updateGenre(genre, genre_id)
        return response.status(200).send({message:"Dados atualizados com sucesso"})
    } catch (err){
        return response.status(500).send({message: "Erro interno", err})
    }
})

routes.delete('/:genre_id', async (request, response) =>{
    try {
        const {genre_id} = request.params;

        await serviceGenre.hardDeleteGenre(genre_id);
        return response.status(200).send({message: "genero deletado FISICAMENTE com sucesso"})
    } catch {
        return response.status(500).send({message: "Erro interno"})
    }
})

routes.delete('/softdelete/:genre_id', async (request, response) =>{
    try {
        const {genre_id} = request.params;

        await serviceGenre.softDeleteGenre(genre_id);
        return response.status(200).send({message: "genero deletado logicamente com sucesso"})
    } catch {
        return response.status(500).send({message: "Erro interno"})
    }
})

export default routes;