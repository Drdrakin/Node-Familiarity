import database from '../repository/mySQL.js'

async function createGenre(genre){ //Async pois o await é usado, uma vez que é um comando "pesado"
    const genreInsert = "INSERT INTO tbl_genero(genero) VALUES (?)" //é declarado como interrogação pois não sabemos os dados (Ainda virão do front)

    const dataGenre = [genre] //Vetor para guardar os dados

    const conn = await database.connect(); //com parenteses pois connect é uma função, await pois é um comando pesado que precisa ser asíncrono
    await conn.query(genreInsert, dataGenre); //Padrão de envio de dados, o primeiro é o comando SQL, o segundo é os valores que o banco vai receber
    conn.end() //Fecha a conexão
}

async function listGenre(){
    const sql = "select * from tbl_genero where deletado = false"

    const conn = await database.connect();
    const [rows] = await conn.query(sql)
    conn.end()

    return rows;
}

async function listDeletedGenre(){
    const sql = "select * from tbl_genero where deletado = true"

    const conn = await database.connect();
    const [rows] = await conn.query(sql)
    conn.end()
    
    return rows;
}
async function updateGenre(genre, id_genre){
    const sql = "update tbl_genero set genero = ? where id_genero = ? "

    const dataGenre = [genre, id_genre];

    const conn = await database.connect();
    await conn.query(sql, dataGenre);
    conn.end();
}

async function hardDeleteGenre(id_genre){
    const sql = "delete from tbl_genero where id_genero = ?"

    const conn = await database.connect();
    await conn.query(sql, id_genre);
    conn.end();
}

async function softDeleteGenre(id_genre){
    const sql = "update tbl_genero set deletado = true where id_genero = ?"

    const conn = await database.connect();
    await conn.query(sql, id_genre);
    conn.end();
}

async function validateGenre(genre){
    const sql = "select * from tbl_genero where genero = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, genre);
    conn.end();

    return rows;
}

export default {createGenre, listGenre, listDeletedGenre, updateGenre, hardDeleteGenre, validateGenre} //Exportado com chaves pois é uma função