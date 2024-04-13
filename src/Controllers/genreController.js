import express from 'express';
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
        response.status(204).send({message: "Não há generos cadastrados"})
    }
    console.log(genres)
    response.status(200).send({message: genres})
})

routes.put('/', async (request, response) =>{
    const {genre, genreId} = request.body;

    console.log("Genero:", genre)
    console.log("Id do Genero:", genreId)

    await serviceGenre.updateGenre(genre, genreId)
    return response.status(200).send({message:"Dados atualizados com sucesso"})

})

export default routes;