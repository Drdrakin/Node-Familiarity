import database from '../repository/mySQL.js'

async function createMovie(movieName, airingYear, duration, genre, director){ 
    const sql = "insert into tbl_filme(nome_filme, ano_lancamento, duracao, FK_id_genero, FK_id_diretor) VALUES (?, ?, ?, ?, ?)" 

    const movieData = [movieName, airingYear, duration, genre, director];

    const conn = await database.connect();
    await conn.query(sql, movieData); 
    conn.end();
}

export default {createMovie}