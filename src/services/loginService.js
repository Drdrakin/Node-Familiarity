import database from '../repository/mySQL.js'

async function passwordUser(email){
    const sql = "select * from tbl_usuario where email = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, email);
    conn.end();

    return rows;
}

async function dataUser(email){
    const sql = "select id_usuario, nome, email, tipo_usuario from tbl_usuario where email = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, email);
    conn.end();

    return rows;
}

export default {passwordUser, dataUser}