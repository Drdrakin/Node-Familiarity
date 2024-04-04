import express from 'express';
import serviceActor from '../services/actorService.js'

const routes = express.Router();

//Método referente ao cadastro de generos
routes.post('/', async (request,response) => {  
    const {actorName, sex, birthDate} = request.body;

    console.log(">>>>> Ator: ", actorName);
    console.log(">>>>> Sexo: ", sex);
    console.log(">>>>> Birthdate: ", birthDate);

    if(actorName.length < 1 && sex.length < 1 && birthDate.length < 1){
        return response.status(400).send({message: "Preencha todos os campos"})
    }

    await serviceActor.createActor(actorName, sex, birthDate)
    return response.status(201).send({message: "Dados do diretor cadastrados com sucesso"});
})

export default routes;