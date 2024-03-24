import mysql from 'mysql2/promise'

async function connect(){ //Essa função é declarada com asíncrona para permitir que seja await
    return await mysql.createConnection({ 
        host: 'localhost',
        port: 3306,
        password: '',
        database: 'cinetec2024',
        user: 'root'
    })
}

export default {connect} //exportada com chaves pois se trata de uma função