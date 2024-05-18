import express from 'express';
import movieService from '../services/movieService.js';
import genreService from '../services/genreService.js';
import directorService from '../services/directorService.js';

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => {
    const {movieName, airingYear, duration, genre, director} = request.body;

    const genderData = await genreService.validateGenre(genre);
    const directorData = await directorService.validateDirector(director);

    const {id_genero} = genderData[0]; 
    const {id_diretor} = directorData[0];

    await movieService.createMovie(movieName, airingYear, duration, id_genero, id_diretor)
    return response.status(201).send({message: "Dados do diretor cadastrados com sucesso"});
})

export default routes;