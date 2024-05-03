import database from '../repository/mySQL.js'

async function createDirector(directorName, nationality, birthDate, sex){ 
    const sql = "insert into tbl_diretor(nome_diretor, nacionalidade, dt_nascimento, sexo) values (?, ?, ?, ?)" 

    const data = [directorName, nationality, birthDate, sex] 

    const conn = await database.connect();
    await conn.query(sql, data); 
    conn.end();
}

async function updateDirector(directorName, nationality, birthDate, sex, id_director){
    const sql = "update tbl_diretor set nome_diretor = ?, nacionalidade = ?, dt_nascimento = ?, sexo = ?, id_diretor = ?"

    const data = [directorName, nationality, birthDate, sex, id_director]

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

async function listDirector(){
    const sql = "select * from tbl_diretor where deletado = false"

    const conn = await database.connect();
    const [rows] = await conn.query(sql)
    conn.end()
    
    return rows;
}

async function listDeletedDirector(){
    const sql = "select * from tbl_diretor where deletado = true"

    const conn = await database.connect();
    const [rows] = await conn.query(sql)
    conn.end()
    
    return rows;
}

async function softDeleteDirector(id_diretor){
    const sql = "update tbl_diretor set deletado = true where id_diretor = ?"

    const conn = await database.connect()
    await conn.query(sql, id_diretor)
    conn.end()
}

async function hardDeleteDirector(id_director){
    const sql = "delete from tbl_diretor where id_diretor = ?"

    const conn = await database.connect();
    await conn.query(sql, id_director);
    conn.end();
}

async function listSpecificDirector(id_director){
    const sql = "select * from tbl_diretor where id_diretor = ? and deletado = false" 

    const conn = await database.connect(); 
    const [rows] = await conn.query(sql, id_director); //rows é um nome proprio para trazer esses dados de forma organizada
    conn.end() //Fecha a conexão

    return rows; 
}

export default {createDirector, updateDirector, listDirector, listDeletedDirector, softDeleteDirector, hardDeleteDirector, listSpecificDirector} 