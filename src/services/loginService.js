import database from '../repository/mySQL.js'

async function passwordUser(email){
    const sql = "select senha from tbl_usuario where email = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, email);
    conn.end();

    return rows;
}

export default {passwordUser}