import express, { request } from 'express';
import serviceGenre from '../services/genreService.js'

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => {  
    const {genre} = request.body;

    console.log(">>>>> genero: ", genre)

    if(genre.length < 1){
        return response.status(400).send({message: "O genero não pode ser nulo"})
    }

    await serviceGenre.createGenre(genre)
    return response.status(201).send({message: "Genero cadastrado com sucesso"});
})

routes.get('/', async (request, response) => {
    const genres = await serviceGenre.listGenre();

    if (genres.length == 0){
        return response.status(204).send({message: "Não há generos cadastrados"})
    }
    return response.status(200).send({message: genres})
})

routes.get('/deletedGenres', async (request, response) => {
    const deletedGenres = await serviceGenre.listDeletedGenre();

    if (deletedGenres.length == 0){
        return response.status(204).send({message: "Não existe generos deletados na base"})
    }

    return response.status(200).send({message: deletedGenres})
})

routes.put('/', async (request, response) =>{
    const {genre, genre_id} = request.body;

    console.log("Genero:", genre)
    console.log("Id do Genero:", genre_id)

    await serviceGenre.updateGenre(genre, genre_id)
    return response.status(200).send({message:"Dados atualizados com sucesso"})

})

routes.delete('/:genre_id', async (request, response) =>{
    const {genre_id} = request.params;

    await serviceGenre.hardDeleteGenre(genre_id);
    return response.status(200).send({message: "genero deletado FISICAMENTE com sucesso"})
})

routes.delete('/softdelete/:genre_id', async (request, response) =>{
    const {genre_id} = request.params;

    await serviceGenre.softDeleteGenre(genre_id);
    return response.status(200).send({message: "genero deletado logicamente com sucesso"})
})

export default routes;