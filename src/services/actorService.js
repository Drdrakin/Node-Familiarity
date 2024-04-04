import database from '../repository/mySQL.js'

async function createActor(actorName, sex, birthDate){ 
    const actorInsert = "INSERT INTO tbl_ator(nome_ator, sexo, dt_nascimento) VALUES (?, ?, ?)" 

    const actorData = [actorName, sex, birthDate] 

    const conn = await database.connect();
    await conn.query(actorInsert, actorData); 
    conn.end();
}

export default {createActor} 