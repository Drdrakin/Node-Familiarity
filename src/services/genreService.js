import database from '../repository/mySQL.js'

async function createGenre(genre){ //Async pois o await é usado, uma vez que é um comando "pesado"
    const genreInsert = "INSERT INTO tbl_genero(genero) VALUES (?)" //é declarado como interrogação pois não sabemos os dados (Ainda virão do front)

    const dataGenre = [genre] //Vetor para guardar os dados

    const conn = await database.connect(); //com parenteses pois connect é uma função, await pois é um comando pesado que precisa ser asíncrono
    await conn.query(genreInsert, dataGenre); //Padrão de envio de dados, o primeiro é o comando SQL, o segundo é os valores que o banco vai receber
    conn.end() //Fecha a conexão
}

async function listGenre(){
    const genreSelect = "select * from tbl_genero where deletado = false"

    const conn = await database.connect();
    const [rows] = await conn.query(genreSelect)
    conn.end()

    return rows;
}

async function listDeletedGenre(){
    const genreSelect = "select * from tbl_genero where deletado = true"

    const conn = await database.connect();
    const [rows] = await conn.query(genreSelect)
    conn.end()
    
    return rows;
}
async function updateGenre(genre, genreId){
    const genreUpdate = "update tbl_genero set genero = ? where id_genero = ? "

    const dataGenre = [genre, genreId];

    const conn = await database.connect();
    await conn.query(genreUpdate, dataGenre)
    conn.end()
}

async function hardDeleteGenre(id_genero){
    const hardDelete = "delete from tbl_genero where id_genero = ?"

    const conn = await database.connect();
    await conn.query(hardDelete, id_genero);
    conn.end();
}

async function softDeleteGenre(id_genero){
    const softDelete = "update tbl_genero set deletado = true where id_genero = ?"

    const conn = await database.connect()
    await conn.query(softDelete, id_genero)
    conn.end()
}

export default {createGenre, listGenre, listDeletedGenre, updateGenre, hardDeleteGenre, softDeleteGenre} //Exportado com chaves pois é uma função