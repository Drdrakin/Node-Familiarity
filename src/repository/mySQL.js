import mysql from 'mysql2/promise'

//Info para quando rodar na etec: o lab 1 não tem senha, a senha do lab 3 é etecembu@123
async function connect(){ //Essa função é declarada com asíncrona para permitir que seja await
    return await mysql.createConnection({ 
        host: 'localhost',
        port: 3306,
        password: 'etecembu@123',
        database: 'cinetec2024',
        user: 'root'
    })
}

export default {connect} //exportada com chaves pois se trata de uma função