import database from '../repository/mySQL.js'

async function createDirector(directorName, nationality, birthDate, sex){ 
    const directorInsert = "INSERT INTO tbl_diretor(nome_diretor, nacionalidade, dt_nascimento, sexo) VALUES (?, ?, ?, ?)" 

    const directorData = [directorName, nationality, birthDate, sex] 

    const conn = await database.connect();
    await conn.query(directorInsert, directorData); 
    conn.end();
}

export default {createDirector} 