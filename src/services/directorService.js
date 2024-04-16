import database from '../repository/mySQL.js'

async function createDirector(directorName, nationality, birthDate, sex){ 
    const sql = "insert into tbl_diretor(nome_diretor, nacionalidade, dt_nascimento, sexo) values (?, ?, ?, ?)" 

    const data = [directorName, nationality, birthDate, sex] 

    const conn = await database.connect();
    await conn.query(sql, data); 
    conn.end();
}

async function updateDirector(){
    const sql = "update tbl_diretor set nome_diretor = ?, nacionalidade = ?, dt_nascimento = ?, sexo = ?, id_diretor = ? "
}

async function listDirector(){
}

async function listDeletedDirector(){

}

async function softDeleteDirector(){

}

async function hardDeleteDirector(){

}

export default {createDirector, updateDirector, listDirector, listDeletedDirector, softDeleteDirector, hardDeleteDirector} 