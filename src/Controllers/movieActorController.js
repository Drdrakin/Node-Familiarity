import express, { response } from "express";
import movieActorService from "../services/movieActorService.js";
import movieService from "../services/movieService.js";
import actorService from "../services/actorService.js";

const routes = express.Router();

routes.post('/', async (request,response) => {  
    const {actorName, movieName} = request.body;

    if(actorName.length < 1 || movieName.length < 1){
        return response.status(400).send({message: "Indique o ator e filme"})
    }

    const movieData = await movieService.validateMovie(movieName);
    const actordata = await actorService.validateActor(actorName)

    const {id_filme} = movieData[0];
    const {id_ator} = actordata[0];
    
    console.log(movieData);
    console.log(actordata);

    await movieActorService.createMovieActor(id_ator, id_filme);

    return response.status(201).send({message: "Dados cadastrados com sucesso"});
})

routes.put('/', async (request,response) => {  
    const {currentActor, currentMovie, newActor, newMovie} = request.body;

    const movieOld = await movieService.validateMovie(currentMovie);
    const actorOld = await actorService.validateActor(currentActor)
    const movieNew = await movieService.validateMovie(newMovie);
    const actorNew = await actorService.validateActor(newActor);

    const id_old_filme = movieOld[0].id_filme;
    const id_new_ator = actorNew[0].id_ator;
    const id_old_ator = actorOld[0].id_ator;
    const id_new_filme = movieNew[0].id_filme;

    await movieActorService.updateMovieActor(id_new_ator, id_new_filme, id_old_filme, id_old_ator);

    return response.status(200).send({message: "Dados atualizados com sucesso"});
})

routes.get('/byActor/:actor', async (request, response) => {
    const {actor} = request.params;

    const movies = await movieActorService.listByActor(actor);
    if (movies.lenght < 1 ){
        return response.status(204).send({message: "Esse ator não participou em nenhum dos filmes da CineEtec"})
    }

    return response.status(200).send({message: movies})
})

routes.get('/byMovie/:movie', async (request, response) => {
    const {movie} = request.params;

    const actors = await movieActorService.listByMovie(movie);
    if (actors.lenght < 1){
        return response.status(204).send({message: "Esse filme não possui atores cadastrados"})
    }

    return response.status(200).send({message: actors})
})

routes.delete('/', async (request, response) => {
    const {actorId, movieId} = request.body;

    if (actorId < 1 || movieId < 1){
        return response.status(400).send({message: "Insira corretamente os dados"})
    }

    await movieActorService.deleteActorMovie(actorId, movieId);
    return response.status(200).send({message: "Deletado com sucesso"})
})

export default routes;