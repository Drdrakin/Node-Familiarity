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

    if(directorName.length < 1 && nationality.length < 1 && birthDate.length < 1 && sex.lenght < 1){
        return response.status(400).send({message: "Preencha todos os campos"})
    }

    await serviceDirector.createDirector(directorName, nationality, birthDate, sex)
    return response.status(201).send({message: "Dados do diretor cadastrados com sucesso"});
})

export default routes;