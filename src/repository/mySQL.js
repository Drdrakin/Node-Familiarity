import mysql from 'mysql2/promise'

//Info para quando rodar na etec: o lab 1 não tem senha, a senha do lab 3 é etecembu@123
async function connect(){ 
    return await mysql.createConnection({ 
        host: 'localhost',
        port: 3306,
        password: '',
        database: 'cinetec2024',
        user: 'root'
    })
}

export default {connect} //exportada com chaves pois se trata de uma função

//Create - Insert
//Read   - Select
//Update - Update
//Delete - Delete