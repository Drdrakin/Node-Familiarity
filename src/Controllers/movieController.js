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

    //O nome desta constante se refere ao campo do banco de dados que está no array na posição [0] do array rows que a função chama
    const {id_genero} = genderData[0]; 
    const {id_diretor} = directorData[0];

    await movieService.createMovie(movieName, airingYear, duration, id_genero, id_diretor)
    return response.status(201).send({message: "Dados do filme cadastrados com sucesso"});
})

routes.get('/:movieId', async (request, response) => {
    const {movieId} = request.params;

    const movies = await movieService.listSpecificMovie(movieId);
    
    if (movies.length == 0){
        return response.status(204).send({message: "Esse filme não existe"})
    }

    return response.status(200).send({message: movies})
})

routes.get('/', async (request, response) => {
    const movies = await movieService.listMovie();
    
    if (movies.length < 0){
        return response.status(204).send({message: "Não há filmes cadastrados"})
    }

    return response.status(200).send({message: movies})
})

routes.delete('/:movieId', async (request, response) =>{
    const {movieId} = request.params;

    await movieService.SoftdeleteMovie(movieId);
    // const movie = await movieService.listSpecificMovie(movieId);

    // if (movie == 0){
    //     return response.status(400).send({message: "Erro, Não deletado"})
    // }
  
    return response.status(204).send({message: "Filme deletado com sucesso"})
})

routes.put('/', async (request, response) => {
    const {movieName, airingYear, duration, genre, director, movieId} = request.body;

    if (movieName.length == 0 || airingYear == 0 || director == 0 || genre == 0 || duration == 0 || movieId == 0){
        return response.status(400).send({message: "Preencha os campos corretamente"})
    }

    const genderData = await genreService.validateGenre(genre);
    const directorData = await directorService.validateDirector(director);

    //O nome desta constante se refere ao campo do banco de dados que está no array na posição [0] do array rows que a função chama
    const {id_genero} = genderData[0]; 
    const {id_diretor} = directorData[0];

    await movieService.updateMovie(movieName, airingYear, duration, id_genero, id_diretor, movieId);

    return response .status(200).send({message: "Atualização dos dados realizada corretamente"})
})

export default routes;