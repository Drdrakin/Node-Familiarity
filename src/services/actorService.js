import database from '../repository/mySQL.js'

async function createActor(actorName, sex, birthDate){ 
    const actorInsert = "INSERT INTO tbl_ator(nome_ator, sexo, dt_nascimento) VALUES (?, ?, ?)" 

    const actorData = [actorName, sex, birthDate] 

    const conn = await database.connect();
    await conn.query(actorInsert, actorData); 
    conn.end();
}

async function updateActor(actorName, sex, birthDate){ 
    const sql = "update tbl_ator set nome_diretor = ?, nacionalidade = ?, dt_nascimento = ?, sexo = ?, id_diretor = ?"

    const data = [actorName, sex, birthDate]

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

async function listActor(){ 
    const sql = "select * from tbl_ator where deletado = false"

    const conn = await database.connect();
    const [rows] = await conn.query(sql)
    conn.end()
    
    return rows;
}
async function listDeletedActor(){ 
    const sql = "select * from tbl_ator where deletado = true"

    const conn = await database.connect();
    const [rows] = await conn.query(sql)
    conn.end()
    
    return rows;
}

async function softDeleteActor(id_ator){ 
    const sql = "update tbl_ator set deletado = true where id_ator = ?"

    const conn = await database.connect()
    await conn.query(sql, id_ator)
    conn.end()
}

async function hardDeleteActor(id_diretor){ 
    const sql = "delete from tbl_ator where id_ator = ?"

    const conn = await database.connect();
    await conn.query(sql, id_diretor);
    conn.end();
}

async function listSpecificActor(id_ator){
    const sql = "select * from tbl_ator where id_ator = ? and deletado = false" 

    const conn = await database.connect(); 
    const [rows] = await conn.query(sql, id_ator); //rows é um nome proprio para trazer esses dados de forma organizada
    conn.end() //Fecha a conexão

    return rows; 
}
export default {createActor, updateActor, listActor, listDeletedActor, softDeleteActor, hardDeleteActor, listSpecificActor} 
