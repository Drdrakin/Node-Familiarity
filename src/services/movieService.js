import database from '../repository/mySQL.js'

async function createMovie(movieName, airingYear, duration, idGenre, idDirector){ 
    const movieInsert = "INSERT INTO tbl_filme(nome_filme, ano_lancamento, duracao, FK_id_genero, FK_id_diretor) VALUES (?, ?, ?, ?)" 

    const movieData = [movieName, airingYear, duration, idGenre, idDirector] 

    const conn = await database.connect();
    await conn.query(movieInsert, movieData); 
    conn.end();
}

export default {createMovie} 