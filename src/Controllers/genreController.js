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

export default routes;