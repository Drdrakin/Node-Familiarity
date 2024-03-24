import express from 'express';

const routes = express.Router();

//Método referente ao GET => que significa busca
routes.get('/', (request,response) => {
    return response.status(200).send('Comunicação Backend e Front concluída')
})

//Método referente ao cadastro de usuários
//Esses request,response são padrões que as vezes aparecem
//apenas como um (req,res) pois são nomes de variáveis
routes.post('/',(request,response) => {  
    const {email, name, password, user_type} = request.body;

    //console.log(">>>>> email: ", email)
    //console.log(">>>>> name: ", name)
    //console.log(">>>>> password: ", password)
    //console.log(">>>>> user type: ", user_type)

    if(senha.lenght < 5){

    }
})

export default routes;
