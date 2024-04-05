import express from 'express';
import movieService from '../services/movieService.js';

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => {  
    const {movieName, airingYear, duration, idGenre, idDirector} = request.body;

    console.log(">>>>> Movie: ", movieName);
    console.log(">>>>> Airing Year: ", airingYear);
    console.log(">>>>> Duration: ", duration);
    console.log(">>>>> Genre:", idGenre);
    console.log(">>>>> Director", idDirector)

    if(movieName.length < 1 || airingYear.length < 1 || duration.length < 1 || idGenre.lenght < 1 || idDirector.lenght <1){
        return response.status(400).send({message: "Erro: Preencha todos os campos corretamente"})
    }

    await movieService.createDirector(movieName, airingYear, duration, idGenre, idDirector)
    return response.status(201).send({message: "Dados do diretor cadastrados com sucesso"});
})

export default routes;