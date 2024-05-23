import database from '../repository/mySQL.js'

async function createMovie(movieName, airingYear, duration, genre, director){ 
    const sql = "insert into tbl_filme(nome_filme, ano_lancamento, duracao, FK_id_genero, FK_id_diretor) VALUES (?, ?, ?, ?, ?)" 

    const movieData = [movieName, airingYear, duration, genre, director];

    const conn = await database.connect();
    await conn.query(sql, movieData); 
    conn.end();
}

async function updateMovie(movieName, airingYear, duration, genre, director, movieId){
    const sql = "update tbl_filme set nome_filme = ?, ano_lancamento = ?, duracao = ?, FK_id_genero = ?, FK_id_diretor = ? where id_filme = ?"

    const movieData = [movieName, airingYear, duration, genre, director, movieId];

    const conn = await database.connect();
    await conn.query(sql, movieData);
    conn.end();
}

async function listSpecificMovie(movieId){
    const sql = "select * from tbl_filme where id_filme = ? and deletado = false"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, movieId);
    conn.end();

    return rows;
}

async function listMovie(){
    const sql = "select * from tbl_filme where deletado = false"

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function SoftdeleteMovie(movieId){
    const sql = "update tbl_filme set deletado = true where id_filme = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, movieId);
    conn.end();

    return rows;
}

export default {createMovie, updateMovie, listMovie,listSpecificMovie, SoftdeleteMovie};
