import database from '../repository/mySQL.js'

async function createMovieActor(actor, movie){
    const sql = "insert into tbl_filme_ator(FK_id_ator, FK_id_filme) values (?, ?)"

    const movieData = [actor, movie];

    const conn = await database.connect();
    await conn.query(sql, movieData);
    conn.end();
}

async function updateMovieActor(newActor, newMovie ,actor, movie){
    const sql = "update tbl_filme_ator set FK_id_ator = ?, FK_id_filme = ? where FK_id_filme = ? and FK_id_ator = ?"

    const movieData = [newActor, newMovie, movie, actor];

    const conn = await database.connect();
    await conn.query(sql, movieData);
    conn.end();
}

async function listByMovie(movie){
    const sql = "select A.nome_ator, F.nome_filme from tbl_filme_ator FA inner join tbl_ator A on FA.FK_id_ator = A.id_ator inner join tbl_filme F on F.id_filme = FA.FK_id_filme inner join tbl_diretor D on D.id_diretor = F.FK_id_diretor where FA.FK_id_filme = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, movie);
    conn.end();

    return rows;
}

async function listByActor(actor){
    const sql = "select A.nome_ator, F.nome_filme from tbl_filme_ator FA inner join tbl_ator A on FA.FK_id_ator = A.id_ator inner join tbl_filme F on F.id_filme = FA.FK_id_filme inner join tbl_diretor D on D.id_diretor = F.FK_id_diretor where FA.FK_id_ator = ?"


    const conn = await database.connect();
    const [rows] = await conn.query(sql, actor);
    conn.end();

    return rows;
}
async function deleteActorMovie(actorId, movieId){
    const sql = "delete from tbl_filme_ator where FK_id_ator = ? and FK_id_filme = ?"
    const data = [actorId, movieId]

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

export default {createMovieActor, updateMovieActor, listByActor, listByMovie, deleteActorMovie}