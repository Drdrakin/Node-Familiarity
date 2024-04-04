import database from '../repository/mySQL.js'

async function createGenre(genre){ //Async pois o await é usado, uma vez que é um comando "pesado"
    const genreInsert = "INSERT INTO tbl_genero(genero) VALUES (?)" //é declarado como interrogação pois não sabemos os dados (Ainda virão do front)

    const dataGenre = [genre] //Vetor para guardar os dados

    const conn = await database.connect(); //com parenteses pois connect é uma função, await pois é um comando pesado que precisa ser asíncrono
    await conn.query(genreInsert, dataGenre); //Padrão de envio de dados, o primeiro é o comando SQL, o segundo é os valores que o banco vai receber
    conn.end() //Fecha a conexão
}

export default {createGenre} //Exportado com chaves pois é uma função